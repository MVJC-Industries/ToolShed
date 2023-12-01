const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const multer = require("multer");
const db = require("../lib/sql/db.js");
const errorHandler = require("../lib/errorHandler.js");

const cloudStorage = new Storage({
  keyFilename: `key.json`,
  projectId: "mvjc",
});
const bucketName = "mvjc";
const bucket = cloudStorage.bucket(bucketName);

const imageController = {};

imageController.uploadImage = (req, res, next) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
    onError: function (err, next) {
      console.log("error", err);
      next(err);
    },
  }).array("image");

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error uploading Files" });
    }
    const email = req.params.userEmail;
    console.log(req.file);
    if (!req.files) {
      res.status(400).send("No file uploaded.");
      return;
    }
    try {
      req.files.forEach((file) => {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();
        blobStream.on("error", (err) => {
          // next(err);
          console.log(err);
        });
        blobStream.on("finish", async () => {
          // The public URL can be used to directly access the file via HTTP.
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          Images.create({ email: email, image: publicUrl });
        });
        // urls.push(publicUrl);
        blobStream.end(file.buffer);
      });
      return next();
    } catch (err) {
      res.status(500).send("Error uploading images");
    }
  });
};
