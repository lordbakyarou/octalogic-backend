const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//File imports
const {
  validateSignupUserData,
  validateLoginData,
} = require("../Utils/AuthUtils");
const {
  Signup,
  IfUserExist,
  FindUserWithLoginId,
} = require("../Models/UserModel");
const verifyToken = require("../Middlewares/verifyToken");

//Router
const AuthRouter = express.Router();

AuthRouter.post("/signup", async (req, res) => {
  const { name, email, password, username } = req.body;

  try {
    //validating the user data from the client
    await validateSignupUserData({ username, email, name, password });
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    //validating is user exist or not
    await IfUserExist({ email, username });

    const userData = await Signup({ username, email, name, password });

    console.log(process.env.SECRET_KEY);

    const token = jwt.sign(
      {
        id: userData._id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
      process.env.SECRET_KEY
    );

    return res.status(201).json({ userData, token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { loginId, password } = req.body;

  try {
    await validateLoginData({ loginId, password });
  } catch (error) {
    res.status(400).json(error);
  }

  try {
    const userData = await FindUserWithLoginId({ loginId });

    const isMatch = bcrypt.compareSync(password, userData.password);

    if (!isMatch) {
      return res.status(400).json("Please enter correct password");
    }

    const token = jwt.sign(
      {
        id: userData._id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
});

AuthRouter.get("/logout", verifyToken, (req, res) => {
  try {
    const expiredToken = jwt.sign({ data: "expired" }, process.env.SECRET_KEY, {
      expiresIn: 1,
    });
    return res
      .status(200)
      .json({ message: "Logged out successfully", token: expiredToken });
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
});

AuthRouter.get("/check", verifyToken, (req, res) => {
  return res.send("working fine");
});

module.exports = AuthRouter;
