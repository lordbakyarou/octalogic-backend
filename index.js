const express = require("express");
const cors = require("cors");

//constants
const app = express();
const PORT = process.env.PORT || 9001;

const db = require("./db");
const AuthRouter = require("./Controllers/AuthController");

//middlewares
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Replace with your frontend's origin
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/check", (req, res) => {
  return res.send("WOrking");
});

app.use("/auth", AuthRouter);

//express server
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
