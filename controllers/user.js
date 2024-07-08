
const User = require("../models/user");

const HandleSignin = (req, res) => {
  return res.render("signin"); // Ensure there is a 'signin.ejs' file in your 'views' directory
};

// this is function for /user/singnin for post request
const HandleSigninpPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
};

const HandleSignup = (req, res) => {
  return res.render("signup"); // Ensure there is a 'signup.ejs' file in your 'views' directory
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

module.exports = {
  HandleSignin,
  HandleSignup,
  HandleSignupPost,
  HandleSigninpPost,
};
