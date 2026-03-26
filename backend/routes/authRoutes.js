const router = require("express").Router();
const { register, login } = require("../controller/authController.js");

router.post("/register", register);
router.post("/login", login);

module.exports = router;