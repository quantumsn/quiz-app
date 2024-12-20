require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const CustomError = require("./utilit/customError.js");
const quizRouter = require("./routes/quiz.js");
const userRouter = require("./routes/user.js");
const cookieParser = require("cookie-parser");

const dbUrl = process.env.ATLASDB_URL;

main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.use(express.json());
app.use(
  cors({
    origin: process.env.REACT_FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());

app.use("/api/user", userRouter);

app.use("/api", quizRouter);

//page not found route
app.all("/api/*", (req, res, next) => {
  throw new CustomError(404, "Page Not Found");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong" } = err;
  res.status(statusCode).json({
    error: message,
  });
});

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
