
const express = require('express');
const equipment = express.Router();
const { Equipment } = require('../../models');

equipment.get('/', ( req, res) => {
  console.log('hit equipment');
  Equipment.all()
  .then((equipment)=>{
    res.json(equipment);
  }).catch(err => {
    res.send(err);
  });
});

equipment.post('/', ( req, res ) => {
  console.log(req.body);
  Equipment.create( req.body )
    .then( equipment => {
      console.log(equipment);
      res.json( equipment );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

module.exports = equipment;
