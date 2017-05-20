/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

module.exports = function(sequelize, DataTypes) {
  var Contractors = sequelize.define("Contractors", {
    name: DataTypes.TEXT,
    cost: DataTypes.DECIMAL
  }, {
    classMethods:  {
      associate: function(models) {
        // Contractors.belongsTo(models.User);
      }
    }
  });

  return Contractors;
};