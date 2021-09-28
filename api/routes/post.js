const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
router.put("/", async (req, res) => {
  try {
    const newPost = new Post({
      userId: req.body.userId,
      photo: req.body.photo,
      username: req.body.username,
      desc: req.body.desc,
    });

    const post = await newPost.save();
    // const updatedUser = User.findByIdAndUpdate(req.userId, {
    //   $push: { posts: post._id },
    // });
    // await updatedUser.save();
    res.send(post);
  } catch (error) {
    console.log("error while creating new post");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post has been updated");
    } else {
      res.status(403).json("you can only updatr your post");
    }
  } catch (error) {
    res.status(403).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      res.status(403).json("you can only delete your post");
    }
  } catch (error) {
    res.status(403).json(error);
  }
});

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post disliked");
    }
  } catch (error) {
    res.status(500).json("error while liking/disliking post");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("error while fetching posts");
  }
});

router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.findAll({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.friend.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPost));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
