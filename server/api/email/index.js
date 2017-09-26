/*jshint esversion: 6*/
const express = require('express');
const email = express.Router();
const { Guest } = require('../../models');
const { getEmails } = require('../../evite/email.js');

email.post('/', (req, res) => {
  Guest.all({raw: true,
    where: {
      event_id: req.body.currentEventId
    }
  })
    .then((allGuest) => {
      getEmails(allGuest, req.body.email);
      res.json(allGuest);
    }).catch(err => {
    });
});
module.exports = email;