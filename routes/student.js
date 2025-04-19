const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/dashboard', (req, res) => {
  const student_id = req.session.user.user_id;
  const sql = `
    SELECT c.course_name, g.letter_grade, g.grade_point
    FROM Grades g
    JOIN Enrollment e ON g.enrollment_id = e.enrollment_id
    JOIN Course c ON e.course_id = c.course_id
    WHERE e.student_id = ?
  `;
  db.query(sql, [student_id], (err, results) => {
    if (err) throw err;
    let totalPoints = 0, totalCredits = 0;
    const response = results.map(row => {
      totalPoints += row.grade_point;
      totalCredits += 1;
      return row;
    });
    const cpi = (totalPoints / totalCredits).toFixed(2);
    res.json({ grades: response, cpi });
  });
});
module.exports = router;