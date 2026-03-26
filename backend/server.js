const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const db = require("./config/db");
const auth = require("./routes/authRoutes.js");
const teacher = require("./routes/teacherRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/teachers", teacher);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});