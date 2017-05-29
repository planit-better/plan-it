/*jshint esversion: 6*/

const express = require('express');
const text = express.Router();
const { groupText, getNumber } = require('../../text-reminder/text.js');
const { Guest } = require('../../models');

text.post('/', (req,res) =>{
  console.log(req.body);
  Guest.all()
  .then((allGuests) => {
   // console.log(allGuests);
    getNumber(allGuests, req.body.message);
    res.json(allGuests);
  }).catch(err =>{
    res.send(err);
  });
});

module.exports = text;