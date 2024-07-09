const express = require("express");
const { Router } = express;
const {
  HandleSignin,
  HandleSignup,
  HandleSignupPost,
  HandleSigninpPost,
  HandleLogout,
} = require("../controllers/user");

const router = Router();

router.route("/signin").get(HandleSignin).post(HandleSigninpPost);

router.route("/signup").get(HandleSignup).post(HandleSignupPost);

router.get("/logout", HandleLogout);

module.exports = router;
