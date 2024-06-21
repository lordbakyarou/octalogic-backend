const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  console.log(req.headers.token);

  if (authHeader) {
    const token = authHeader;

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(400).json("User not loggedIn");
      req.user = user;
      next();
    });
  } else {
    return res.status(200).json("You are now logged in");
  }
};

module.exports = verifyToken;
