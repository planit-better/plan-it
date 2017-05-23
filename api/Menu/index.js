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

module.exports = menu;
