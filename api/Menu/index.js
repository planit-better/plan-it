/*jshint esversion: 6 */
const express = require('express');
const menu = express.Router();
const { Menu } = require('../../models');

menu.get('/', ( req, res ) => {
  Menu.all({

  })
  .catch(err => {
    res.send(err);
  });
});