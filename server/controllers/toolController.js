const db = require("../lib/sql/db.js");

const toolController = {};

toolController.searchTool = async (req, res, next) => {
  console.log("req.query in searchTool controller", req.body.query);

  try {
    const { query } = req.body;
    const toolQuery = `SELECT * FROM tools 
		WHERE LOWER(tool_title) LIKE LOWER($1)`;
    const params = [`%${query}%`];
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

toolController.getMyTools = async (req, res, next) => {
  const userId = parseInt(req.query.userId);
  const queryText = "SELECT * FROM tools WHERE user_id = $1"
  //query database for tools
  try {
    const myTools = await db.query(queryText, [userId]);
    res.locals.myTools = myTools.rows;
    return next();
  } catch (error) {
    return next({
      log: "Express error handler caught middleware error when getting tools by user id",
      status: 404,
      message: { err: err }
    });
  }
}

module.exports = toolController;