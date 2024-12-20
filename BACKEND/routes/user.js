const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilit/wrapAsync");

const User = require("../models/user.js");

router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      let { userName, email, password } = req.body;
      let newUser = new User({ username: userName, email });
      let registerUser = await User.register(newUser, password);
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        } else {
          res.status(200).json({ message: "Welcome Bhoiya !" });
        }
      });
    } catch (err) {
      next(err);
    }
  })
);

router.post(
  "/login",
  // passport.authenticate("local", {
  //   failureMessage: true,
  //   failWithError: true,
  // }),
  wrapAsync(async (req, res) => {
    res.status(201).json({ message: "Welcome back Bhoiya" });
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: "You are Succesfully Logout" });
    }
  });
});

module.exports = router;
