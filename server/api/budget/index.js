const express = require('express');
const budget = express.Router();
const db = require('../../models');
const { Budget } = db;

budget.get('/', ( req, res) => {
  Budget.all({raw: true})
  .then((budget)=>{
    res.json(budget);
  }).catch(err => {
    res.send(err);
  });
});

budget.post('/', ( req, res ) => {
  Budget.create( req.body )
    .then( budget => {
      res.json( budget );
    })
    .catch( err => {
      res.json( err );
    });
});

budget.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  Budget.destroy({
    where: {
      id: path
    }
  } )
  .then( budget => {
    res.json( budget );
  })
  .catch( err => {
    res.json( err );
  });
});

budget.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Budget.update({
    type: req.body.type,
    amount: req.body.amount,
    type_id: req.body.type_id,
    event_id: req.body.event_id
  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      res.send('posted');
    });
});


module.exports = budget;
