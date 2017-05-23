/*jshint esversion: 6 */

const express = require('express');
const contractors = express.Router();
const { Contractors } = require('../../models');

contractors.get('/', ( req, res) => {
  Contractors.all()
  .then((guests)=>{
    res.json(guests);
  }).catch(err => {
    res.send(err);
  });
});

contractors.post('/', ( req, res ) => {
  console.log(req.body);
  Contractors.create( req.body )
    .then( contractors => {
      console.log(contractors);
      res.json( contractors );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

// contractors.put('/:id', ( req, res ) => {

// })

module.exports = contractors;