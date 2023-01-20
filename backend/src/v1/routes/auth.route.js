const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authCheck = require("../middleware/authCheck");
const User = require("../../models/User.model");

router.post("/signup", async (req, res, next) => {
  try {
    const { Phone, Username, Password } = req.body;
    if (!(Phone && Password && Username)) {
      return res.status(400).json({ err: "All input is required" });
    }
    const oldUser = await User.findOne({ Phone });
    if (oldUser) {
      return res.status(409).json({ err: "User Already Exist. Please Login" });
    }
    let encryptedPassword = await bcrypt.hash(Password, 10);
    const user = await User.create({
      Username,
      Phone: Phone,
      Password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, Phone },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    user.save();
    var date = new Date();
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(201).json({ err: null });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { Phone, Password } = req.body;
    console.log(Phone, Password);
    if (!(Phone && Password)) {
      return res.status(400).json({ err: "All input is required" });
    }
    const user = await User.findOne({ Phone: Phone });
    if (!user) {
      return res.status(401).json({ err: "Invalid Phone" });
    }
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ err: "Invalid Password" });
    } else {
      const token = jwt.sign(
        { user_id: user._id, Phone },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      user.save();
      var date = new Date();
      date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        httpOnly: true,
      });
      res.status(201).json({ err: null, role: user.Role });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
router.post("/logincheck", authCheck, async (req, res, next) => {
  res.status(200).json({ err: null, user: req.user });
});
module.exports = router;
