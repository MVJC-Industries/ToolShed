const express = require("express");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../lib/sql/db.js"); //should point to our db
//import controllers

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a email and password.
 * The strategy parses the email and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(
  new LocalStrategy(function verify(email, password, cb) {
    db.get("SELECT * FROM users WHERE email = ?", [email], function (err, row) {
      if (err) {
        return cb(err);
      }
      if (!row) {
        return cb(null, false, {
          message: "Incorrect email or password.",
        });
      }

      crypto.pbkdf2(
        password,
        row.salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return cb(null, false, {
              message: "Incorrect email or password.",
            });
          }
          return cb(null, row);
        }
      );
    });
  })
);

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and email.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and email, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

var router = express.Router();

/** GET /login
 *
 * This route prompts the user to log in.
 *
 * The 'login' view renders an HTML form, into which the user enters their
 * email and password.  When the user submits the form, a request will be
 * sent to the `POST /login/password` route.
 *
 * @openapi
 * /login:
 *   get:
 *     summary: Prompt the user to log in using a email and password
 *     responses:
 *       "200":
 *         description: Prompt.
 *         content:
 *           text/html:
 */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/** POST /login/password
 *
 * This route authenticates the user by verifying a email and password.
 *
 * A email and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route.  The email and password is
 * authenticated using the `local` strategy.  The strategy will parse the
 * email and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established.  As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 *
 * @openapi
 * /login/password:
 *   post:
 *     summary: Log in using a email and password
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: number
 *     responses:
 *       "302":
 *         description: Redirect.
 */
router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

/* POST /logout
 *
 * This route logs the user out.
 */
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/* GET /signup
 *
 * This route prompts the user to sign up.
 *
 * The 'signup' view renders an HTML form, into which the user enters their
 * desired email and password.  When the user submits the form, a request
 * will be sent to the `POST /signup` route.
 */
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired email and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
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
