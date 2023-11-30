const bcrypt = require("bcryptjs");
const db = require("../lib/sql/db.js"); //should point to our db
const errorHandler = require("../lib/errorHandler.js");
const salt = 11;

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    // console.log("/signup route hit!", req.body);
    const { first_name, last_name, email, password, phone_number, zip_code } =
      req.body;
    const hashPassword = await bcrypt.hash(password, salt);
    const text = `INSERT INTO users (first_name, last_name, email, hashed_password, phone_number, zip_code, created_at) 
			VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) 
			RETURNING *`;
    const params = [
      first_name,
      last_name,
      email,
      hashPassword,
      phone_number,
      zip_code,
    ];
    const newUser = await db.query(text, params);
    res.locals.user_id = newUser.rows[0].id;
    console.log("userController.createUser middleware newUser: ", newUser.rows);
    return next();
  } catch (error) {
    return next(
      errorHandler({
        controller: "userController",
        method: "createUser",
        type: "middleware",
        error: error,
      })
    );
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    console.log("verifyUser middleware req.body: ", req.body);
    const { email, password } = req.body;
    const text = `SELECT * FROM users
		WHERE email = ($1)`;
    const params = [email];
    const validUser = await db.query(text, params);
    console.log("validUser: ", validUser.rows[0].hashed_password);
    const validPassword = await bcrypt.compare(
      password,
      validUser.rows[0].hashed_password.trim() //need to trim whitespace becuase schema has 64 characters, and bcrypt affords 60
    );
    console.log("validPassword: ", validPassword);
    if (validPassword) {
      res.locals.user_id = validUser.rows[0].id;
      console.log(res.locals.user_id);
      return next();
    } else {
      return next();
    }
  } catch (error) {
    return next(
      errorHandler({
        controller: "userController",
        method: "verifyUser",
        type: "middleware",
        error: error,
      })
    );
  }
};

module.exports = userController;
