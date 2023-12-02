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
const toolController = require("./controllers/toolController.js");
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:8081",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api', apiRouter);
//route handlers
app.use("/user", userRouter);
app.use("/reservation", reservationRouter);

//public routes with limited permissions if not logged in
app.use("/dashboard/tools/search", toolController.searchTool, (req, res) => {
  console.log("i am in the toolRouter middleware", res.locals.tools);
  return res.status(200).json(res.locals.tools);
});
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

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

<<<<<<< HEAD
//route handlers
app.use("/user", userRouter);
app.use("/reservation", reservationRouter);

//public routes with limited permissions if not logged in
app.use("/dashboard/tools/search", toolController.searchTool, (req, res) => {
  console.log("i am in the toolRouter middleware", res.locals.tools);
  return res.status(200).json(res.locals.tools);
});
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});
=======
>>>>>>> dev
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

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

// Check the database connection
async () => {
  try {
    await pgPool.query("SELECT NOW()"); // Query the database to check the connection
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
<<<<<<< HEAD
};
=======
})();
// app.listen(3000, ()=> { co
>>>>>>> dev
