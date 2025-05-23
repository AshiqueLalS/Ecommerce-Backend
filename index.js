const express = require("express");
const connectDB = require("./config/db");
const apiRouter = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-front-end-client.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.json("Hello World");
});

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "end-point unavailable" });
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server starts on port ${process.env.PORT}`);
  }
});
