const express = require('express');
const equipment = express.Router();
const { Equipment } = require('../../models');

equipment.get('/', ( req, res) => {
  console.log('hit equipment');
  Equipment.all()
  .then((equipment)=>{
    res.json(equipment);
  }).catch(err => {
    res.send(err);
  });
});

equipment.post('/', ( req, res ) => {
  console.log(req.body);
  Equipment.create( req.body )
    .then( equipment => {
      console.log(equipment);
      res.json( equipment );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

equipment.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  console.log(req.body);
  Equipment.destroy({
    where: {
      id: path
    }
  } )
  .then( equipment => {
    console.log( equipment );
    res.json( equipment );
  })
  .catch( err => {
    console.log( err );
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
      //console.log('wat'+data);
      res.send('posted');
    });
});

module.exports = equipment;