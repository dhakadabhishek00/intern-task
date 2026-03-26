const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "codeignite";

exports.register = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO auth_user (email, first_name, last_name, password) VALUES (?, ?, ?, ?)",
    [email, first_name, last_name, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User Registered" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM auth_user WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(400).json("User not found");

      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid) return res.status(400).json("Invalid password");

      const token = jwt.sign({ id: result[0].id }, jwtSecret);

      res.json({ token });
    }
  );
};