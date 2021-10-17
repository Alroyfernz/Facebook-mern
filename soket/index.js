const io = require("soket.io")(8900, {
  cors: {
    origin: "https://localhost:3000",
  },
});
io.on("connection", (soket) => {
  console.log("a user connected");
});
