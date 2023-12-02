const db = require("../lib/sql/db.js");

const reservationsController = {};


reservationsController.getMyReservations = async (req, res, next) => {
  const userId = parseInt(req.query.userId);
  const queryText = `
  SELECT
    reservations.id AS reservation_id,
    reservations.user_id,
    reservations.tool_id,
    reservations.pick_up_date,
    reservations.drop_off_date,
    reservations.created_at AS reservation_created_at,
    reservations.updated_at AS reservation_updated_at,
    tools.tool_title,
    tools.description AS tool_description,
    tools.price,
    tools.published_at AS tool_published_at,
    tools.updated_at AS tool_updated_at
  FROM
    reservations
  JOIN
    tools ON reservations.tool_id = tools.id
  WHERE
    reservations.user_id = $1;
`;
  //query database for tools
  try {
    const myReservations = await db.query(queryText, [userId]);
    res.locals.myReservations = myReservations.rows;
    return next();
  } catch (error) {
    return next({
      log: "Express error handler caught middleware error when getting tools by user id",
      status: 404,
      message: { err: err }
    });
  }
}

module.exports = reservationsController;