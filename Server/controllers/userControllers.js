const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const UserModel = require("../models/user.model");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the field");
  }

  const userExits = await UserModel.find({ email });

  console.log("User", userExits);

  if (userExits.length >= 1) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await UserModel.create({ name, email, password, pic });
  bcrypt.hash(password, 5, function (err, hashedPassed) {
    if (hashedPassed) {
      res.status(201).json({
        _id: user._Id,
        name: user.name,
        email: email.email,
        password: hashedPassed,
        pic: user.pic,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  console.log(user);
  const hashedPassed = user.password;
  bcrypt.compare(password, hashedPassed, function (err, result) {
    if (result) {
      res.status(201).json({
        _id: user._Id,
        name: user.name,
        email: email.email,
        password: hashedPassed,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Id or password");
    }
  });
});
module.exports = { registerUser, login };
