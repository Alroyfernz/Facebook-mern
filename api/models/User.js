const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.favpng.com/18/15/13/avatar-user-profile-male-logo-png-favpng-peKBCyaCJCvp0C3KdHzm0bu2n.jpg",
    },
    DOB: {
      type: Array,
      default: [],
    },
    gender: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    coverPicture: {
      type: String,
      default: "",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = await jwt.sign(
      { _id: this._id },
      "qwertyuiopasdfghjklzxcvbnmqwertyuioasdfghjklzxcvbnmqwertyuiopasdfghjkl"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", userSchema);
