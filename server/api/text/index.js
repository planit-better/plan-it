/*jshint esversion: 6*/

const express = require('express');
const text = express.Router();
const { groupText, getNumber } = require('../../text-reminder/text.js');
const db = require('../../models');
const { Guest } = db;


text.post('/', (req,res) =>{
  Guest.all({raw: true,
    where: {
      event_id: req.body.currentEventId
    }
  })
  .then((allGuests) => {
    getNumber(allGuests, req.body.message, req.body.currentEvent, req.body.currentUser, req.body.currentEventId);
    res.json(allGuests);
  }).catch(err =>{
    res.send(err);
  });
});

module.exports = text;