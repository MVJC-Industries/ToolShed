const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationController.js");
const toolController = require("../controllers/toolController.js");
const db = require("../lib/sql/db.js");
const dayjs = require("dayjs");
//import controllers

/**
 * GET
 * gets all rentals - my tools that I am renting to other people - associated with a the current userId (stored in browser)
 */
router.get(
  "/rentals",
  (req, res, next) => {
    console.log("req.query in rentals: ", req.query);
    next();
  },
  reservationsController.getMyReservations,
  (req, res) => {
    res.status(200).json(res.locals.myReservations);
  }
);

/**
 * GET
 * gets all listings associated with a the current userId (stored in browser)
 */
router.get(
  "/listings",
  (req, res, next) => {
    console.log("req.query in listings: ", req.query);
    next();
  },
  toolController.getMyTools,
  (req, res) => {
    res.status(200).json(res.locals.myTools);
  }
);

// /**
//  * GET
//  * displays all reservations (tools that I need for my projects) associated with the current userId
//  */
// router.get("/", (req, res) => {
//   //get userid from browser session if still valid
//   res.send("received a request");
//   // db.query(`SELECT * FROM reservations WHERE user_id=`);
//   // db.query(`SELECT * FROM reservations WHERE user_id= $1`, [user_id]); //need to ask somebody how to get data from the database

//   // //get images and tool information
//   // db.query(`SELECT * FROM reservations `);
//   // // get tools and tools media
//   // db.query(`SELECT * FROM tools WHERE id=${tool_id}`);
//   // db.query(`SELECT * FROM media WHERE tool_id=${tool_id}`);

//   //process the data into a single object

//   //send back to the front end
//   res.sendStatus(200);

//   //determine how to handle errors
// });

/**
 * POST
 * adds reservation associated to a the current userId (stored in browser)
 */
router.post("/", async (req, res, next) => {
  try {
    //get userid from browser session if still valid
    const { userId, toolId, pickup, dropoff, message } = req.body;
    const currentTime = dayjs().toString();
    return res.send(req.body);
    db.query(
      "INSERT INTO reservations (user_id, tool_id, pick_up_date, drop_off_date, created_at, updated_at) / VALUES ($1, $2, $3, $4, $5, $6)",
      [userId, toolId, pickup, dropoff, currentTime, currentTime]
    );
  } catch (err) {
    next(err);
    return next();
  }
});

/**
 * GET
 * gets all rentals - my tools that I am renting to other people - associated with a the current userId (stored in browser)
 */
router.get("/rentals", (req, res, err) => {
  //get userid from browser session if still valid
});

/**
 * GET
 * gets all listings associated with a the current userId (stored in browser)
 */
router.get("/listings", (req, res, err) => {
  //get userid from browser session if still valid
});

/**
 * delete
 * delete current reservation from the reservation table-> refresh and redirect to reservations page
 */
router.delete("/delete", (req, res, err) => {
  //get reservation id from req.body
  //delete it from the database
  //send back a success message
});

module.exports = router;
