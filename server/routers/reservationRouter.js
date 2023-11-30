const express = require("express");
const router = express.Router();
const db = require("../lib/sql/db.js");
//import controllers

/**
 * GET
 * displays all reservations (tools that I need for my projects) associated with the current userId
 */
router.get("/", (req, res) => {
  //get userid from browser session if still valid

  // db.query(`SELECT * FROM reservations WHERE user_id=`);
  db.query(`SELECT * FROM reservations`); //need to ask somebody how to get data from the database

  // get tools and tools media
  db.query(`SELECT * FROM tools WHERE id=${tool_id}`);
  db.query(`SELECT * FROM media WHERE tool_id=${tool_id}`);

  //process the data into a single object

  //send back to the front end
  res.send();

  //determine how to handle errors
});

/**
 * POST
 * adds reservation associated to a the current userId (stored in browser)
 */
router.post("/", (req, res, err) => {
  const { pickup, dropoff, message } = req.body;
  //get userid from browser session if still valid
  //may need to change pickup date and drop off dates into strings
  //need to add message to reservations type string

  const data = {};

  db.query(
    `INSERT INTO reservations (user_id, tool_id, pick_up_date, drop_off_date) / VALUES (${user_id}, ${tool_id}, ${pickup}, ${dropoff}, ${user_id})`
  );
  //once I get the database running, setup timestamp for created_at, and updated_at
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
