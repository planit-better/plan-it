/*jshint esversion: 6*/

const express = require('express');
const equipment = express.Router();
const db = require('../../models');
const { Equipment } = db;


equipment.get('/', ( req, res) => {
  Equipment.all({raw: true})
  .then((equipment)=>{
    res.json(equipment);
  }).catch(err => {
    res.send(err);
  });
});

equipment.post('/', ( req, res ) => {
  Equipment.create( req.body )
    .then( equipment => {
      res.json( equipment );
    })
    .catch( err => {
      res.json( err );
    });
});

equipment.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  Equipment.destroy({
    where: {
      id: path
    }
  } )
  .then( equipment => {
    res.json( equipment );
  })
  .catch( err => {
    res.json( err );
  });
});

equipment.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Equipment.update({
    name: req.body.name,
    type: req.body.type,
    cost: req.body.cost
  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      res.send('posted');
    });
});

module.exports = equipment;