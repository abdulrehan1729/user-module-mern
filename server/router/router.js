const router = require("express").Router();
const userController = require("../controllers/user");
const passport = require("../passport");

router.post("/verify-email", (req, res) => {
  userController.verifyEmail(req, res);
});

router.post("/register/:token", (req, res) => {
  userController.registerUser(req, res);
});

router.post(
  "/login",
  (req, res, next) => {
    console.log("routes/user.js, login, req.body: ");
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user.first_name);
    var userInfo = {
      username: req.user.first_name
    };
    res.send(userInfo);
  }
);

module.exports = router;
