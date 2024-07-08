const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const { CheckForAuthenticationCookie } = require("./middleware/authentication");
const app = express();
const PORT = 8000;

const MONGODB_URL =process.env.MONGODB_URL || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true, // Note: No longer necessary, but harmless if left
  useUnifiedTopology: true, // Note: No longer necessary, but harmless if left
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB Connected");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse request body and cookies
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckForAuthenticationCookie("token"));

// Route to render the home page
app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

// Use the user routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
