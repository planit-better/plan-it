/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();


module.exports = function(sequelize, DataType){
  var User = sequelize.define("User", {
    username:
    {
      type: DataType.TEXT,
      allowNull: false
    },
    password: DataType.TEXT,

  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Event, {
          foreignKey: {
            name: "event_id",
            allowNull: true
          }
        });
      }
    }
  });
  return User;
};