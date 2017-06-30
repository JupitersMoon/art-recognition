'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const humps = require('humps');
const knex = require('../knex');


let insertUser = (data) => knex('users').insert(data).returning(['id', 'email'])


router.post('/users', (req, res, next) => {
  let hashed = bcrypt.hash(req.body.password, 12)
  .then (hashedPassword => {
    delete req.body.password;
    // req.body.password = hashedPassword

    req.body.hashed_password = hashedPassword
    insertUser(humps.decamelizeKeys(req.body))
      .then(data => {
        res.json(humps.camelizeKeys(data[0]))
      })
  })

  .catch((err) => {
    next(err);
  });

})

module.exports = router;
