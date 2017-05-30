/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();


module.exports = function(sequelize, DataTypes) {
  var Budget = sequelize.define("Budget", {

    type: DataTypes.TEXT,
    amount: DataTypes.DECIMAL,
    type_id: DataTypes.INTEGER
  }, {
    classMethods:  {
      associate: function(models) {
        Budget.belongsTo(models.Event, {
          foreignKey: {
            name: 'event_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Budget;
};