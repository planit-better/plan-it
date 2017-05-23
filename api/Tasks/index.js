/*jshint esversion: 6 */
const express = require('express');
const tasks = express.Route();
const { Tasks } = require ('../../models');


tasks.get('/', ( req, res ) => {
  Tasks.all ({

  })
  .catch(err => {
    res.send(err);
  });
});