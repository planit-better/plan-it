/*jshint esversion: 6 */

const express = require('express');
const contractors = express.Router();
const { Contractors } = require('../../models/Contractors');

contractors.get('/', ( req, res) => {
  Contractors.all({raw: true, where: {event_id: 1}})
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

contractors.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  console.log(req.body);
  Contractors.destroy({
    where: {
      id: path
    }
  } )
  .then( contractors => {
    console.log( contractors );
    res.json( contractors );
  })
  .catch( err => {
    console.log( err );
    res.json( err );
  });
});

contractors.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Contractors.update({
    company_name: req.body.company_name,
    cost: req.body.cost,
    contact: req.body.contact,
    date_hired: req.body.date_hired,
    deadline: req.body.deadline
  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      //console.log('wat'+data);
      res.send('posted');
    });
});




// contractors.put('/:id', ( req, res ) => {

// })

module.exports = contractors;