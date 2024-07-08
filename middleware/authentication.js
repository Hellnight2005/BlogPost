const { validateToken } = require("../services/authentication");

function CheckForAuthenticationCookie(cookiename) {
  return (req, res, next) => {
    const TokenCookieValue = req.cookies[cookiename];
    if (!TokenCookieValue) {
      return next();
    }
    try {
      const userpayload = validateToken(TokenCookieValue);
       req.user = userpayload;
      // res.user = userpayload;
      next();
    } catch (error) {
      return next();
    }
  };
}

module.exports = {
    CheckForAuthenticationCookie,
}