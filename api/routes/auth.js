const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });
    const user = await newUser.save();
    // await User.generateAtuhToken();
    // console.log(token);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("no user found");
    const confirmedPassword = await bcrypt.compare(
      user.password,
      req.body.password
    );
    console.log(confirmedPassword);
    // !confirmedPassword && res.status(404).json("wrong password");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json("error while login");
  }
});

module.exports = router;
