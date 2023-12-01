const express = require("express");
const router = express.Router();

const db = require("../lib/sql/db.js");

router.post("/upload", imageController.uploadImage, (req, res) => {
  res.status(200).send("Images uploaded");
});
