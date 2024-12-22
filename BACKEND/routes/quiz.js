const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilit/wrapAsync.js");
const { isAuthenticated } = require("../middleware.js");

const Quiz = require("../models/quiz.js");
const User = require("../models/user.js");
const Participent = require("../models/participent.js");

router.get(
  "/home",
  isAuthenticated,
  wrapAsync(async (req, res) => {
    let userData = await User.findById({
      _id: req.user._id,
    }).populate({ path: "quizzes" });
    res.status(200).json(userData.quizzes);
  })
);

router.post(
  "/quiz/new",
  isAuthenticated,
  wrapAsync(async (req, res) => {
    let data = new Quiz(req.body.quiz);
    data.owner = req.user._id;
    let newQuiz = await data.save();
    let user = await User.findById(req.user._id);
    user.quizzes.push(newQuiz);
    await user.save();
    res.status(200).json({
      message: "Data received successfully",
      quizId: newQuiz._id.toString(),
    });
  })
);

router.post(
  "/result",
  isAuthenticated,
  wrapAsync(async (req, res, next) => {
    try {
      let { marks, quizId } = req.body;
      let participent = new Participent({ user: req.user.username, marks });
      let newParticipent = await participent.save();
      let quiz = await Quiz.findById(quizId);
      quiz.participents.push(newParticipent);
      await quiz.save();
      res.status(200).json({ message: "Result Saved" });
    } catch (err) {
      next(err);
    }
  })
);

router.get(
  "/quiz/:id",
  isAuthenticated,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Quiz.findById(id).populate({ path: "participents" });
    let dataOwnerId = data.owner.toString();
    if (req.user._id == dataOwnerId) {
      res.json({ data, isOwner: true });
    } else {
      res.json({ data, isOwner: false });
    }
  })
);

module.exports = router;
