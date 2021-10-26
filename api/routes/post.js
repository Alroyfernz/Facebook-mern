const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { uploadImage } = require("../imageUpload");

router.put("/", async (req, res) => {
  const photo = req.body.photo;
  try {
    const photoUrl = photo && (await uploadImage(photo));
    const newPost = new Post({
      userId: req.body.userId,
      photo: photoUrl,
      desc: req.body.caption,
    });

    const post = await newPost.save();
    console.log(post);
    console.log(photoUrl);

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
    console.log(post);
    await post.deleteOne();
    res.status(200).json("post has been deleted");
    console.log("deleted");
  } catch (error) {
    res.status(403).json(error);
    console.log("error lol");
  }
});

router.post("/like/:id", async (req, res) => {
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

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.friends.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.send(userPosts.concat(...friendPost));
    // res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    // const user = await User.findOne({ id: req.params.id });
    const posts = await Post.find({ userId: req.params.id });
    res.send(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
