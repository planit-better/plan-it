/*jshint esversion: 6*/
const express = require('express');
const email = express.Router();
const { Guest } = require('../../models');
const { getEmails } = require('../../evite/email.js');
console.log(getEmails);

email.post('/', (req, res) => {
  console.log(req.body);
  Guest.all({raw: true})
    .then((allGuest) => {
      getEmails(allGuest, req.body.email);
      res.json(allGuest);
    }).catch(err => {
      console.log(err);
    });
});
module.exports = email;