const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/", (req, res) => {
  userController.registerUser(req, res);
});

module.exports = router;
