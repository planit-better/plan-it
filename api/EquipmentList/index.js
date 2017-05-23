/*jshint esversion: 6 */
const express = require('express');
const equipmentlist = express.Router();
const { EquipmentList } = require('../../models');

equipmentlist.get('/', ( req, res) => {
  EquipmentList.all({

  })
  .catch(err => {
    res.send(err);
  });
});