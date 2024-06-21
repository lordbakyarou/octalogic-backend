const express = require("express");
const cors = require("cors");

//constants
const app = express();
const PORT = process.env.PORT || 9001;

const db = require("./db");
const AuthRouter = require("./Controllers/AuthController");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

//Express
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.get("/check", (req, res) => {
  return res.send("WOrking");
});

app.use("/auth", AuthRouter);

//express server
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
