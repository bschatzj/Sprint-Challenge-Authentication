const router = require('express').Router();
const helper = require('./authHelpers');
const bcrypt = require('bcryptjs');
const secrets = require('../secret');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  helper.add(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(400).json(err)
    })

}
);

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  }

  const options = { expiresIn: '1h'}
  const token = jwt.sign(payload, secrets.jwtSecret, options)
  return token
}

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body

  helper.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user)
        res.status(200).json({token: token})
      } else {
        res.status(400).json({error: 'invalid'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

module.exports = router;
