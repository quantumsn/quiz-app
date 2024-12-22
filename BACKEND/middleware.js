const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    res.status(401).json({ message: "You must be logged in" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  }
};
