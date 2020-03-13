const router = require("express").Router();
const userController = require("../controllers/user");
const passport = require("../passport");

router.post("/verify-email", (req, res) => {
  userController.verifyEmail(req, res);
});

router.post("/register", (req, res) => {
  userController.registerUser(req, res);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in", req.user.first_name);

  console.log(req.user);
  res.send(req.user);
});

router.get("/", (req, res, next) => {
  userController.userHome(req, res, next);
});

router.put("/update", (req, res) => {
  userController.userUpdate(req, res);
});

router.post("/logout", (req, res) => {
  userController.userLogout(req, res);
});

module.exports = router;
