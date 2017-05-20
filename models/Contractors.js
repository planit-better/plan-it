/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

module.exports = function(sequelize, DataTypes) {
  var Contractors = sequelize.define("Contractors", {
<<<<<<< HEAD
    name: DataTypes.TEXT,
    cost: DataTypes.DECIMAL
=======
    company_name: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    contact: DataTypes.INTEGER,
    date_hired: DataTypes.DATEONLY,
    deadline: DataTypes.DATEONLY

>>>>>>> acde7913318b42923fa415803e01810363836cfe
  }, {
    classMethods:  {
      associate: function(models) {
        // Contractors.belongsTo(models.User);
      }
    }
  });

  return Contractors;
};