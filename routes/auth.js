const express = require('express');
const router = express.Router();
const db = require('../db');
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      req.session.user = user;
      if (user.role === 'student') {
        res.redirect('/student.html');
      } else if (user.role === 'instructor') {
        res.redirect('/instructor/dashboard');
      } else if (user.role === 'admin') {
        res.redirect('/admin/dashboard');
      }
    } else {
      res.send('Invalid credentials');
    }
  });
});
module.exports = router;