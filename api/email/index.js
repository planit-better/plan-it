/*jshint esversion: 6*/
const express = require('express');
const email = express.Router();
const { Guest } = require('../../models');
const { getEmails } = require('../../evite/email.js');
console.log(getEmails);

email.get('/', (req, res) => {
  Guest.all({raw: true})
    .then((allGuest) => {
      getEmails(allGuest);
      res.json(allGuest);
    }).catch(err => {
      console.log(err);
    });
});
module.exports = email;