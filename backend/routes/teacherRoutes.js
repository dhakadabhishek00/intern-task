const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createTeacher, getTeachers } = require("../controller/teacherController.js");

router.post("/", auth, createTeacher);
router.get("/", auth, getTeachers);

module.exports = router;