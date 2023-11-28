const express = require("express");
const router = express.Router();
//import controllers

/**
 * GET
 * return all listings to display on the dashboard
 */
router.get("/");
/**
 * takes form data from listing/add page and adds to database -> displays listing/:id on submit
 */
router.post("/");

/**
 * GET
 * returns all tools in the database filtered using parameters -> display on dashboard
 */
router.get("/?");

/**
 * GET and display individual listing
 */
router.get("/:id");

/**
 * edit changes within the listing view, and update listing in the database -> refresh listing/:id
 */
router.put("/listing/:id");

/**
 * delete listing from the database -> redirect to dashboard
 */
router.delete("/listing/:id");
module.exports = router;
