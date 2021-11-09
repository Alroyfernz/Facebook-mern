const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const storyRouter = require("./routes/story");
const commentRouter = require("./routes/comment");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const port = 8800;
const multer = require("multer");
const path = require("path");
const { createServer } = require("http");
const socketio = require("socket.io");
var bodyParser = require("body-parser");

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = socketio(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection to database succesfull"))
  .catch((error) => {
    console.log(error);
  });

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
// app.get("/", (req, res) => {
//   res.json("server running");
// });
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/story", storyRouter);
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

var users = [];

const addUser = (userId, socketId) => {
  console.log("adding user", userId);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => {
    user.socketId !== socketId;
  });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  console.log(socket.id);

  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  console.log(users);
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(receiverId, "uska id");
    console.log(users);
    const user = getUser(receiverId);
    console.log(text);
    console.log(user, "friend");
    io.to(user?.socketId).emit("getMessage", { senderId, text });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
httpServer.listen(port, () => {
  console.log("Backend server running");
});
// httpServer.listen(port, () => {
//   console.log("Socket server running");
// });
