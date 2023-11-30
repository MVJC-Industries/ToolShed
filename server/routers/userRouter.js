const express = require("express");
const router = express.Router();
const passport = require("passport");
// const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../lib/sql/db.js"); //should point to our db
const userController = require("../controllers/userController.js");
//import controllers

router.post("/signup", userController.createUser, async (req, res, next) => {
  // console.log("res.locals.user: ", res.locals.user);
  if (res.locals.user) res.status(200).json({ user_id: res.locals.user[0].id });
  else
    res.status(500).json({ error: "There was an error signing up this user" });
});

/**
 * POST
 * checks user and pass against user table -> returns cookie id if successful, redirect to dashboard
 */
// router.post("/login");
router.post("/login", userController.verifyUser, async (req, res, next) => {
  if (res.locals.user_id || res.locals.token)
    res.status(200).json({
      user_id: res.locals.user_id /* , sessionToken: res.locals.token */,
    });
  else
    res.status(400).json({
      error: "Invalid username or password",
    });
});

/**
 * POST
 * remove cookie id from browser -> redirect to dashboard
 */
router.post("/logout");

module.exports = router;
