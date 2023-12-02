const db=require("../lib/sql/db.js");
const express = require("express");

const toolController={};

toolController.searchTool=async(req,res,next)=>{
    console.log('i am in searchTool controller',req.body.query);

    const query=req.body.query;

    try {
        // const query = `SELECT * FROM transactions WHERE user_id=${req.body.userID} AND date BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ORDER BY
        const searchResults = await db.query(
            `SELECT * FROM "public"."tools" WHERE tool_title = '${query}'`
          );

          console.log('i am searchResults',searchResults.rows)
        if (!searchResults.rows) {
            return next('no db result')
        } else {
            // console.log('----> rangeOfTRansaction results: ', result.rows);
            res.locals.tools=searchResults.rows;
            return next();
        }
    }
    catch (err) {
        return next(err);
    }

}

toolController.getMyTools = async (req, res, next) => {
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
      status: 404,
      message: { err: err }
    });
  }
}

module.exports = toolController;