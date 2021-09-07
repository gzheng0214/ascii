const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserModel.findById(userId);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6)
    return res.status(401).send("Email or password is incorrect");
  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).send("Email or password is incorrect");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send("Email or password is incorrect");
    }

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
