const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const post = await newComment.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("error while commenting");
  }
});

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error, "error while fetching comments");
  }
});
module.exports = router;
