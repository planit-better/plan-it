/*jshint esversion: 6 */
const express = require('express');
const menu = express.Router();
const { Menu } = require('../../models');

menu.get('/', ( req, res) => {
  console.log('hit menu');
  Menu.all()
  .then((menu)=>{
    console.log(menu)
    res.json(menu);
  }).catch(err => {
    res.send(err);
  });
});

menu.post('/', ( req, res ) => {
  console.log(req.body);
  Menu.create( req.body )
    .then( menu => {
      console.log(menu);
      res.json( menu );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

menu.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  console.log(req.body);
  Menu.destroy({
    where: {
      id: path
    }
  } )
  .then( menu => {
    console.log( menu );
    res.json( menu );
  })
  .catch( err => {
    console.log( err );
    res.json( err );
  });
});

menu.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Menu.update({
    type_of_food: req.body.type_of_food,
    cost_per_person: req.body.cost_per_person,
    restaurant_name: req.body.restaurant_name
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


module.exports = menu;
