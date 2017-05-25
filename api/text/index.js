/*jshint esversion: 6*/

const express = require('express');
const text = express.Router();
const { groupText, getNumber } = require('../../text-reminder/text.js');
const { Guest } = require('../../models');

text.get('/', (req,res) =>{
  //console.log('hit text api');
  Guest.all()
  .then((allGuests) => {
   // console.log(allGuests);
    getNumber(allGuests);
    res.json(allGuests);
  }).catch(err =>{
    res.send(err);
  });
});

module.exports = text;