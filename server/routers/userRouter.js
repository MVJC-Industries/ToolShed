const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../lib/sql/db.js"); //should point to our db
//import controllers

router.post("/signup", async (req, res, next) => {
  console.log("/signup route hit!", req.body);
  const { first_name, last_name, email, password, phone_number, zip_code } =
    req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO users (first_name, last_name, email, hashed_password, phone_number, zip_code, created_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)",
    [first_name, last_name, email, hashPassword, phone_number, zip_code],
    function (err) {
      //   console.log("err", err, "hashedPassword", hashedPassword);
      if (err) {
        return next(err);
      }
      var user = {
        // id: this.lastID,
        email: req.body.email,
      };
      res.redirect("/user/login");
    }
  );
});

module.exports = router;

//end of stolen code

/**
 * POST
 * If user and password are correct, redirect to login
 */
router.post("/signup");

/**
 * POST
 * checks user and pass against user table -> returns cookie id if successful, redirect to dashboard
 */
// router.post("/login");
router.get("/login", function (req, res, next) {
  res.render("login");
});

/**
 * POST
 * remove cookie id from browser -> redirect to dashboard
 */
router.post("/logout");

module.exports = router;
