/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var EquipmentList = sequelize.define("EquipmentList", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL

  }, {
    classMethods: {
      associate: function(models) {
        EquipmentList.hasMany(models.Contractors, {
          foreignKey: {

          }
        });
        EquipmentList.belongsTo(models.Tasks, {
          foreginKey: {

          }
        });
      }
    }
  });

  return EquipmentList;
};