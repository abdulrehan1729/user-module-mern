const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/register/:token", (req, res) => {
  userController.registerUser(req, res);
});

router.post("/verify-email", (req, res) => {
  userController.verifyEmail(req, res);
});
module.exports = router;
