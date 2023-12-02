const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationController.js");
const toolController = require("../controllers/toolController.js");
//import controllers



/**
 * GET
 * gets all rentals - my tools that I am renting to other people - associated with a the current userId (stored in browser)
 */
router.get("/rentals", 
  (req, res, next) => {
    console.log('req.query in rentals: ', req.query);
    next();
  },
  reservationsController.getMyReservations,
  (req, res) => {
    res.status(200).json(res.locals.myReservations);
  }
)

/**
 * GET
 * gets all listings associated with a the current userId (stored in browser)
 */
router.get("/listings", 
  (req, res, next) => {
    console.log('req.query in listings: ', req.query);
    next();
  }, 
  toolController.getMyTools,
  (req, res) => {
    res.status(200).json(res.locals.myTools);
  }

);

/**
 * GET
 * displays all reservations (tools that I need for my projects) associated with the current userId
 */
router.get("/");

/**
 * POST
 * adds reservation associated to a the current userId (stored in browser)
 */
router.post("/");

/**
 * delete
 * delete current reservation from the reservation table-> refresh and redirect to reservations page
 */
router.delete("/:reservationId");

module.exports = router;
