const db = require("../lib/sql/db.js");

const toolController = {};

toolController.searchTool = async (req, res, next) => {
  console.log("req.query in searchTool controller", req.body.query);

  try {
    const { query } = req.body;
    const toolQuery = `SELECT * FROM tools 
		WHERE tool_title LIKE ($1)`;
    const params = [query];
    const searchResults = await db.query(toolQuery, params);

    console.log("i am searchResults", searchResults);
    if (!searchResults.rows) {
      return next("no db result");
    } else {
      // console.log('----> rangeOfTRansaction results: ', result.rows);
      res.locals.tools = searchResults.rows;
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = toolController;
