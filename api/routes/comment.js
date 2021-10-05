const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const post = await newComment.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error, "error while fetching comments");
  }
});
module.exports = router;
