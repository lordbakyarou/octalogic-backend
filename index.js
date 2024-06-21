const express = require("express");
const cors = require("cors");
require("dotenv").config();

//constants
const app = express();
const PORT = process.env.PORT || 9001;

const db = require("./db");
const AuthRouter = require("./Controllers/AuthController");

const corsOptions = {
  origin: "https://octalogic-frontend.vercel.app/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

//Express
app.use(express.json());

app.get("/check", (req, res) => {
  return res.send("WOrking");
});

app.use("/auth", AuthRouter);

//express server
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
