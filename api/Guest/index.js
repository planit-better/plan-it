const express = require('express');
const guest = express.Router();
const { Guest } = require('../../models');

guest.get('/', ( req, res) => {
  console.log('hit guest');
  Guest.all()
  .then((guest)=>{
    console.log(guest)
    res.json(guest);
  }).catch(err => {
    res.send(err);
  });
});

guest.post('/', ( req, res ) => {
  console.log(req.body);
  Guest.create( req.body )
    .then( guest => {
      console.log(guest);
      res.json( guest );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

module.exports = guest;