const express = require("express");
const { Router } = express;
const {
  HandleSignin,
  HandleSignup,
  HandleSignupPost,
  HandleSigninpPost,
} = require("../controllers/user");

const router = Router();

router.route("/signin")
.get(HandleSignin)
.post(HandleSigninpPost);

router.route("/signup")
.get(HandleSignup)
.post(HandleSignupPost);

module.exports = router;
