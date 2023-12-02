const express = require("express");
const router = express.Router();
const db = require("../lib/sql/db.js");
//import controllers

// router.get("/search", async (req, res) => {
//     console.log('hi i am in /search',req.body)
//     const { query } = req.body;
//     try {
//       // Implement fuzzy search using SQL queries
//       const searchResults = await db.query(
//         `SELECT * FROM tools WHERE tool_title ILIKE '%${query}%'`
//       );
//       res.locals.tools=res.json(searchResults.rows);
//     } catch (error) {
//       res.status(500).json({ error: "An error occurred while searching for tools" });
//     }
//   });
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
