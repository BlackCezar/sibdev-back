const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const jwt = require('jsonwebtoken')
const users = require('./accounts.json')
const secret = process.env.SECRET_KEY || 'secret'

/* GET home page. */
router.post('/login', function(req, res, next) {
  const user = users.find(acc => acc.login === req.body.login && acc.password === req.body.password)
  if (user) {
    const token = jwt.sign(user, secret)
    res.json({
      code: 0,
      token,
      object: user
    })
  } else {
    res.json({
      code: 400
    })
  }
});

router.get('/logout', (req, res) => {
  res.json({code: 0})
})

router.post('/profile', function(req, res, next) {
  if (req.body.token) {
    const user = jwt.decode(req.body.token, secret)
    res.json({
      code: 0,
      object: user
    })
  } else {
    res.json({
      code: 400
    })
  }
});

module.exports = router;
