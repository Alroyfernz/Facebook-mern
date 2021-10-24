const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // gender: req.body.gender,
    });
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(500).json("no user found");
    const confirmedPassword = await bcrypt.compare(
      user.password,
      req.body.password
    );
    console.log(confirmedPassword);
    // !confirmedPassword && res.status(404).json("wrong password");
    const token = await user.generateAuthToken();
    console.log(token);
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 7200000),
      httpOnly: true,
    });
    res.status(200).send(user);
    console.log("login success");
  } catch (error) {
    res.status(500).json("error while login");
    console.log(error);
  }
});

module.exports = router;
