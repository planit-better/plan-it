/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

module.exports = function(sequelize, DataTypes) {
  var Contractors = sequelize.define("Contractors", {

    company_name: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    contact: DataTypes.INTEGER,
    date_hired: DataTypes.DATE,
    deadline: DataTypes.DATE

  }, {
    classMethods:  {
      associate: function(models) {
        // Contractors.belongsTo(models.User);
      }
    }
  });

  return Contractors;
};