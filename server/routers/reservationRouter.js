const express = require("express");
const router = express.Router();
const db = require("../lib/sql/db.js");
//import controllers

/**
 * GET
 * displays all reservations (tools that I need for my projects) associated with the current userId
 */
router.get("/", (req, res) => {
  const { pickup, dropoff, message } = req.body;
  //get userid from browser session if still valid

  //   pool.query(`SELECT * FROM reservations WHERE user_id=`);
  db.query(`SELECT * FROM reservations`);

  //determine how to handle errors
});

/**
 * POST
 * adds reservation associated to a the current userId (stored in browser)
 */
router.post("/", (req, res, err) => {
  console.log(req.body);
});

/**
 * GET
 * gets all rentals - my tools that I am renting to other people - associated with a the current userId (stored in browser)
 */
router.get("/rentals");

/**
 * GET
 * gets all listings associated with a the current userId (stored in browser)
 */
router.get("/listings");

/**
 * delete
 * delete current reservation from the reservation table-> refresh and redirect to reservations page
 */
router.delete("/:reservationId");

module.exports = router;
