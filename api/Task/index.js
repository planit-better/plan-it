const express = require('express');
const task = express.Router();
const { Task } = require('../../models');

task.get('/', ( req, res) => {
  console.log('hit task');
  Task.all()
  .then((task)=>{
    console.log(task)
    res.json(task);
  }).catch(err => {
    res.send(err);
  });
});

task.post('/', ( req, res ) => {
  console.log(req.body);
  Task.create( req.body )
    .then( task => {
      console.log(task);
      res.json( task );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

module.exports = task;
