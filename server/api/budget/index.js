const express = require('express');
const budget = express.Router();
const db = require('../../models');
const { Budget } = db;

budget.get('/', ( req, res) => {
  console.log('hit budget');
  Budget.all({raw: true})
  .then((budget)=>{
    console.log(budget)
    res.json(budget);
  }).catch(err => {
    res.send(err);
  });
});

budget.post('/', ( req, res ) => {
  console.log(req.body);
  Budget.create( req.body )
    .then( budget => {
      console.log(budget);
      res.json( budget );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

budget.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  console.log(req.body);
  Budget.destroy({
    where: {
      id: path
    }
  } )
  .then( budget => {
    console.log( budget );
    res.json( budget );
  })
  .catch( err => {
    console.log( err );
    res.json( err );
  });
});

budget.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Budget.update({
    name: req.body.name,
    type: req.body.type,
    assigned_to: req.body.assigned_to,
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


module.exports = budget;
