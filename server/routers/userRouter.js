const express = require("express");
const router = express.Router();
//import controllers

/**
 * POST
 * If user and password are correct, redirect to login
 */
router.post("/signup");

/**
 * POST
 * checks user and pass against user table -> returns cookie id if successful, redirect to dashboard
 */
router.post("/login");

/**
 * POST
 * remove cookie id from browser -> redirect to dashboard
 */
router.post("/logout");

module.exports = router;
