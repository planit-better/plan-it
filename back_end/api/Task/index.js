const express = require('express');
const task = express.Router();
const { Task } = require('../../models/Task');

task.get('/', ( req, res) => {
  console.log('hit task');
  Task.all({raw: true, where: {task_id: 2}})
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

task.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  console.log(req.body);
  Task.destroy({
    where: {
      id: path
    }
  } )
  .then( task => {
    console.log( task );
    res.json( task );
  })
  .catch( err => {
    console.log( err );
    res.json( err );
  });
});

task.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Task.update({
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


module.exports = task;
