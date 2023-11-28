const { Pool } = require("pg");
require("dotenv").config();

const PG_URI = process.env.CONNECTION_STRING;
const pw = process.env.CONNECTION_PW;

// create a new pool here using the connection string above
const pool = new Pool({
  password: pw,
  connectionString: PG_URI,
});

pool.on("connect", () => {
  console.log("connected to the db");
});

module.exports = pool;

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   }
// };
