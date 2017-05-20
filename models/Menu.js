/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    name: DataTypes.STRING,
    cost:DataTypes.DECIMAL

  }, {
    classMethods: {
      associate: function(models) {
        // Menu.belongsTo(models.User);
      }
    }
  });

  return Menu;
};