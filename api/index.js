const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

const multer = require("multer");
const path = require("path");
var bodyParser = require("body-parser");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection to database succesfull"))
  .catch((error) => {
    console.log("error while connecting to database");
  });
// bodyParser = {
//   json: { limit: "50mb", extended: true },
//   urlencoded: { limit: "50mb", extended: true },
// };
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  fileName: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.listen(process.env.PORT, () => {
  console.log("Backend server running");
});
