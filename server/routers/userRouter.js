const express = require("express");
const router = express.Router();

const db = require("../lib/sql/db.js"); //should point to our db
const userController = require("../controllers/userController.js");
const sessionController = require("../controllers/sessionController.js");
//import controllers

router.post(
  "/signup",
  userController.createUser,
  sessionController.getToken,
  async (req, res) => {
    // console.log("res.locals.user: ", res.locals.user);
    if (res.locals.user_id)
      res.status(200).json({
        user_id: res.locals.user_id,
        sessionToken: res.locals.token,
      });
    else
      res
        .status(500)
        .json({ error: "There was an error signing up this user" });
  }
);

/**
 * POST
 * checks user and pass against user table -> returns cookie id if successful, redirect to dashboard
 */
// router.post("/login");
router.post(
  "/login",
  userController.verifyUser,
  sessionController.getToken,
  async (req, res, next) => {
    console.log("res.locals from router: ", res.locals);
    if (res.locals.user_id && res.locals.token)
      res.status(200).json({
        user_id: res.locals.user_id,
        sessionToken: res.locals.token,
      });
    else
      res.status(401).json({
        error: "Invalid username or password",
      });
  }
);

/**
 * POST
 * remove cookie id from browser -> redirect to dashboard
 */
router.post("/logout");

module.exports = router;
