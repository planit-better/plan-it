/*jshint esversion: 6*/

const express = require('express');
const event = express.Router();
const db = require('../../models');
const { Event } = db;


event.get('/', ( req, res) => {
  Event.all({raw: true, where: {user_id: req.user.id}})
  .then((event)=>{
    res.json(event);
  }).catch(err => {
    res.send(err);
  });
});

event.post('/', ( req, res ) => {
  Event.create( req.body )
    .then( event => {
      res.json( event );
    })
    .catch( err => {
      res.json( err );
    });
});

event.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  Event.destroy({
    where: {
      id: path
    }
  } )
  .then( event => {
    res.json( event );
  })
  .catch( err => {
    res.json( err );
  });
});

event.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Event.update({
    name: req.body.name,
    location_name: req.body.location_name,
    location_address: req.body.location_address,
    event_date: req.body.event_date,
    event_time: req.body.event_time

  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      res.send('posted');
    });
});


module.exports = event;
