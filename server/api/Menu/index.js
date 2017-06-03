/*jshint esversion: 6 */
const express = require('express');
const menu = express.Router();
const db = require('../../models');
const { Menu } = db;


menu.get('/', ( req, res) => {
  Menu.all({raw: true})
  .then((menu)=>{
    res.json(menu);
  }).catch(err => {
    res.send(err);
  });
});

menu.post('/', ( req, res ) => {
  Menu.create( req.body )
    .then( menu => {
      res.json( menu );
    })
    .catch( err => {
      res.json( err );
    });
});

menu.delete('/:id', ( req, res ) => {
  let path = req.path.split('')[1];
  Menu.destroy({
    where: {
      id: path
    }
  } )
  .then( menu => {
    res.json( menu );
  })
  .catch( err => {
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
      res.send('posted');
    });
});


module.exports = menu;
