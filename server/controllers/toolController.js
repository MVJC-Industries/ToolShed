const db = require("../lib/sql/db.js");

const ToolController = {};

ToolController.getMyTools = async (req, res, next) => {
  const userId = parseInt(req.query.userId);
  const queryText = "SELECT * FROM tools WHERE user_id = $1"
  //query database for tools
  try {
    const myTools = await db.query(queryText, [userId]);
    res.locals.myTools = myTools.rows;
    console.log('my Tools from DB within ToolController: ', myTools.rows);
    return next();
  } catch (error) {
    return next({
      log: "Express error handler caught middleware error when getting tools by user id",
      message: { err: err }
    });
  }
}

module.exports = ToolController;