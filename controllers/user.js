const mongoose = require("mongoose");
const User = require("../models/user");

const HandleSignin = (req, res) => {
  return res.render("Signin"); // Ensure there is a 'ignin.ejs' file in your 'views' directory
};

// this is function for /user/singnin for post request
const HandleSigninpPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("Signin", {
        error:
          "You need to Create Account first. No account found with this email.",
      });
    }
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    console.error("Signin error:", error);
    return res.render("Signin", {
      error: "Incorrect Email or Password",
    });
  }
};

const HandleSignup = (req, res) => {
  return res.render("Signup"); // Ensure there is a 'ignup.ejs' file in your 'views' directory
};

// this is function for /user/singnup for post request
const HandleSignupPost = async (req, res) => {
  const { fullName, email, password } = req.body; // Use req.body instead of res.body
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
};

const HandleLogout = async (req, res) => {
  res.clearCookie("token").redirect("/");
};

module.exports = {
  HandleSignin,
  HandleSignup,
  HandleSignupPost,
  HandleSigninpPost,
  HandleLogout,
};
