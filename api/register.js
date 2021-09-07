const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

router.post("/", async (req, res) => {
  const { email, password, name } = req.body;
  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6) {
    return res.status(401).send("Password must be at least 6 characters");
  }
  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(401).send("Email already registered");
    }
    user = new UserModel({ name, email: email.toLowerCase(), password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json(token);
      }
    );
  } catch (e) {
    console.log(e);
    return res.status.send(500).send("Server error");
  }
});

module.exports = router;
