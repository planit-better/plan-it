/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Equipment = sequelize.define("Equipment", {
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

  return Equipment;
};