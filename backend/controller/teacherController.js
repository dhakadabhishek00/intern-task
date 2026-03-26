const db = require("../config/db");

exports.createTeacher = (req, res) => {
  const { user_id, university_name, gender, year_joined } = req.body;

  const ownerId = user_id || req.user.id;

  db.query(
    "INSERT INTO teachers (user_id, university_name, gender, year_joined) VALUES (?, ?, ?, ?)",
    [ownerId, university_name, gender, year_joined],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Teacher Added" });
    }
  );
};

exports.getTeachers = (req, res) => {
  db.query(
    `SELECT * FROM teachers 
     JOIN auth_user ON teachers.user_id = auth_user.id`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};