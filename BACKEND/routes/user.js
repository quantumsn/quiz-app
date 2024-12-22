const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilit/wrapAsync");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  checkPassword,
} = require("../utilit/passwordHash&Check.js");

const User = require("../models/user.js");

router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      let { userName, email, password } = req.body;
      let hashedPass = await hashPassword(password);
      let newUser = new User({
        username: userName,
        email,
        password: hashedPass,
      });
      let savedUser = await newUser.save();

      let payload = { _id: savedUser._id, username: savedUser.username };
      let secret = process.env.SECRET;
      const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "7d",
      });
      res.cookie("authToken", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "None", // Cross-origin
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Welcome Bhoiya" });
    } catch (err) {
      next(err);
    }
  })
);

router.post(
  "/login",
  wrapAsync(async (req, res) => {
    let { password, username } = req.body;
    let userData = await User.findOne({ username });
    if (userData != null) {
      let isMatched = await checkPassword(userData.password, password);
      if (isMatched) {
        let payload = { _id: userData._id, username };
        let secret = process.env.SECRET;
        const token = jwt.sign(payload, secret, {
          algorithm: "HS256",
          expiresIn: "7d",
        });

        res.cookie("authToken", token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
          // sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ message: "Welcome back Bhoiya" });
      } else {
        res.status(401).json({ message: "Your Passsword is incorrect" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Your username is incorrect or User doesn't exist" });
    }
  })
);

router.get("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    // secure: true,
    // sameSite: "None",
  });
  res.status(200).send({ message: "Logged out successfully" });
});

module.exports = router;
