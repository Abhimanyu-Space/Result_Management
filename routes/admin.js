const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/dashboard', (req, res) =>{
  res.sendFile('admin.html', { root: 'public' });
});
router.get('/generate-grades', (req, res) => {
  db.query(`
    SELECT m.enrollment_id, 
      ((assignment1 + assignment2 + assignment3)/3 * 0.3 + end_sem * 0.7) AS total_marks
    FROM Marks m
  `, 
  (err, results) => {
    if (err) throw err;

    results.forEach(({ enrollment_id, total_marks }) => {
      let grade = 'F', point = 0;

      if (total_marks >= 90) { grade = 'A'; point = 10; }
      else if (total_marks >= 80) { grade = 'B'; point = 9; }
      else if (total_marks >= 70) { grade = 'C'; point = 8; }
      else if (total_marks >= 60) { grade = 'D'; point = 7; }
      else if (total_marks >= 50) { grade = 'E'; point = 6; }

      db.query(
        'INSERT INTO Grades (enrollment_id, letter_grade, grade_point) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE letter_grade=?, grade_point=?',
        [enrollment_id, grade, point, grade, point]
      );
    });
    res.send('Grades generated.');
  });
});
module.exports = router;