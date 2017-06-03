/*jshint esversion: 6*/

const express = require('express');
const task = express.Router();
const db = require('../../models');
const { Task } = db;

task.get('/', ( req, res) => {
  Task.all({raw: true})
  .then((task)=>{
    res.json(task);
  }).catch(err => {
    res.send(err);
  });
});

task.post('/', ( req, res ) => {
  Task.create( req.body )
    .then( task => {
      res.json( task );
    })
    .catch( err => {
      res.json( err );
    });
});

task.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  Task.destroy({
    where: {
      id: path
    }
  } )
  .then( task => {
    res.json( task );
  })
  .catch( err => {
    res.json( err );
  });
});

task.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Task.update({
    name: req.body.name,
    type: req.body.type,
    cost: req.body.cost,
    deadline: req.body.deadline,
    complete : req.body.complete,
  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      res.send('posted');
    });
});


module.exports = task;
