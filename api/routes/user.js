const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      } catch (error) {
        return res.status(500).json("error in hash");
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      res.status(500).json("error while updating user");
    }
  } else {
    return res.status(403).json("you can only update your account");
  }
});

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

router.put("/:id/add", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (!currentUser.friends.includes(req.body.userId)) {
        await currentUser.updateOne({ $push: { friends: req.body.userId } });
        await user.updateOne({ $push: { friends: req.params.id } });
        res.status(200).send("user added to friends list");
      } else {
        res.status(403).json("You are already friends with this user");
      }
    } catch (error) {}
  } else {
    res.status(403).json("you cannot add yourself");
  }
});

router.put("/:id/remove", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.params.id);
      const user = await User.findById(req.body.userId);
      if (currentUser.friends.includes(req.body.userId)) {
        await currentUser.updateOne({ $pull: { friends: req.body.userId } });
        await user.updateOne({ $pull: { friends: req.params.id } });
        res.status(200).send("user removed from friends list");
      } else {
        res.status(403).json("you arent friends");
      }
    } catch (error) {}
  } else {
    res.status(403).json("you cannot remove yourself");
  }
});
module.exports = router;
