/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var GuestList = sequelize.define("GuestList", {
    name: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // GuestList.belongsTo(models.User);
      }
    }
  });

  return GuestList;
};