const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const pgPool = require("./lib/sql/db.js");

// import routers
const userRouter = require("./routers/userRouter.js");
const reservationRouter = require("./routers/reservationRouter.js");
const toolRouter = require("./routers/toolRouter.js");

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route handlers
app.use('/reservation', (req, res, next) => {
  console.log('incoming reservation path: ', req.path);
  next();
}, reservationRouter);

app.use('/user', (req, res, next) => {
  console.log('hit user router');
  next();
}, userRouter);

//public routes with limited permissions if not logged in
app.use('/tools', (req, res, next) => {
  console.log('hit tool router');
  next();
}, toolRouter);


if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  // statically serve everything in the build folder on the route '/dist'
  app.use("/dist", express.static(path.join(__dirname, "../dist")));
  // serve index.html on the route '/'
  app.get("/*", (req, res) => {
    console.log("dev request");
    return res.status(200).sendFile(path.join(__dirname, "../src/index.html"));
  });
} else {
  console.log("entered prod path");
  app.use("/", express.static(path.join(__dirname, "../dist")));

  app.get("/*", (req, res) => {
    console.log("catch all");
    return res.status(200).sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

//route handlers
// app.use("/user", userRouter);
// app.use("/reservation", reservationRouter);

//public routes with limited permissions if not logged in
// app.use("/tools", toolRouter);

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});
//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, async () => {
  try {
    await pgPool.query("SELECT NOW()"); // Query the database to check the connection
    console.log("Connected to the database");
    console.log("Server started on port " + PORT);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});
