const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { uploadImage } = require("../imageUpload");

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json("Account has been deleted");
    } catch (error) {
      res.status(500).json("error while deleting user");
    }
  } else {
    return res.status(403).json("you can only delete your account");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    // const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/add/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (!currentUser.friends.includes(req.body.userId)) {
        const ogUser = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { friends: req.body.userId } },
          { new: true }
        );
        await User.findOneAndUpdate(
          { _id: req.body.id },
          { $push: { friends: req.params.id } }
        );
        res.status(200).send(ogUser);
      } else {
        res.status(403).json("You are already friends with this user");
      }
    } catch (error) {}
  } else {
    res.status(403).json("you cannot add yourself");
  }
});

router.put("/remove/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (currentUser.friends.includes(req.body.userId)) {
        const ogUser = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friends: req.body.userId } },
          { new: true }
        );
        await User.findOneAndUpdate(
          { _id: req.body.id },
          { $pull: { friends: req.params.id } },
          { new: true }
        );
        console.log(currentUser);
        res.status(200).send(ogUser);
      } else {
        res.status(403).json("you arent friends");
      }
    } catch (error) {}
  } else {
    res.status(403).json("you cannot remove yourself");
  }
});

router.put("/:id", async (req, res) => {
  const photo = req.body.imageURL;
  const photo2 = req.body.coverURL;
  try {
    const photoUrl = photo && (await uploadImage(photo));
    console.log(photoUrl);
    const photoUrl2 = photo2 && (await uploadImage(photo2));

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { profilePicture: photoUrl, coverPicture: photoUrl2 },
      },

      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(403).json(error);
  }
});
module.exports = router;
