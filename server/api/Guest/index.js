/*jshint esversion: 6*/
const express = require('express');
const guest = express.Router();
const db = require('../../models');
const { Guest } = db;


// everytime hit Get route will send texts
guest.get('/', ( req, res) => {
  Guest.all()
  .then((guest) =>{
    res.json(guest);
  }).catch(err =>{
    res.send(err);
  });
});

guest.post('/', ( req, res ) => {
  Guest.create( req.body )
    .then( guest => {
      res.json( guest );
    })
    .catch( err => {
      res.json( err );
    });
});

guest.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  Guest.destroy({
    where: {
      id: path
    }
  } )
  .then( guest => {
    res.json( guest );
  })
  .catch( err => {
    res.json( err );
  });
});

guest.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Guest.update({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    will_attend: req.body.will_attend,
    accompanying_guests: req.body.accompanying_guests,
    can_drink: req.body.can_drink,
    diet_restriction: req.body.diet_restriction
  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      res.send('posted');
    });
});

module.exports = guest;