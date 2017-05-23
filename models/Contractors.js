/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

module.exports = function(sequelize, DataTypes) {
  var Contractors = sequelize.define("Contractors", {

    company_name: DataTypes.TEXT,
    cost: DataTypes.DECIMAL,
    contact: DataTypes.INTEGER,
    // date_hired: DataTypes.DATEONLY,
    // deadline: DataTypes.DATEONLY

  }, {
    classMethods:  {
      associate: function(models) {
        // Contractors.belongsTo(models.User);
        Contractors.hasMany(models.EquipmentList, {
          foreginKey: {

          }
        });

        Contractors.hasOne(models.Task, {

        });
      }
    }
  });

  return Contractors;
};