/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Equipment = sequelize.define("EquipmentList", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL

  }, {
    classMethods: {
      associate: function(models) {
        // EquipmentList.belongsTo(models.User);
      }
    }
  });

  return Equipment;
};