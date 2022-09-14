const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const users = require('./accounts.json')
const secret = process.env.SECRET_KEY || 'secret'

/* GET home page. */
router.post('/login', function(req, res, next) {
  console.log(req.body)
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

router.post('/profile', function(req, res, next) {
  console.log(req.body)
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
