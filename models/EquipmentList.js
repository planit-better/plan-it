/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var EquipmentList = sequelize.define("EquipmentList", {
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL

  }, {
    classMethods: {
      associate: function(models) {
        // EquipmentList.belongsTo(models.User);
      }
    }
  });

  return EquipmentList;
};