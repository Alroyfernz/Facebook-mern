const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const storyRouter = require("./routes/story");
const commentRouter = require("./routes/comment");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const port = process.env.PORT || 8900;
const multer = require("multer");
const path = require("path");
var bodyParser = require("body-parser");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection to database succesfull"))
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
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
app.get("/", (req, res) => {
  res.json("server running");
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/story", storyRouter);
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log("Backend server running");
});
