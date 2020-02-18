var express = require('express');
var router = express.Router();
const User = require('../models/user.js');


// Create a user
router.post('/', (req, res, next) => {
  const {name, email, password} = req.body;

  User.findOne({ email }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }
  


  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';

  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  if (!name || !password || !email) {
    res.status(400).json({ message: 'Não é possível criar usuário sem senha ou nome' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
    return;
  }

  User.create({ name, password, email, token})
  .then(user => {
    res.status(200).json({message: 'Usuário adicionado com sucesso'})
  })
  .catch(err => console.log(err))  
  })

});


router.post('/login', (req, res) => {
  let { email, password } = req.body
  User.findOne({ email }, (err, user) => {

    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (user.password === password) {
      res.status(200).json(user)
    }

  })

})

module.exports = router;
