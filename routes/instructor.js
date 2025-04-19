const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/dashboard', (req, res) => {
  res.sendFile('instructor.html', { root: 'public' });
});
router.post('/add-marks', (req, res) => {
  const { enrollment_id, assignment1, assignment2, assignment3, end_sem } = req.body;
  const sql = 'INSERT INTO Marks (enrollment_id, assignment1, assignment2, assignment3, end_sem) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [enrollment_id, assignment1, assignment2, assignment3, end_sem], (err) => {
    if (err) throw err;
    res.send('Marks inserted successfully');
  });
});
module.exports = router;