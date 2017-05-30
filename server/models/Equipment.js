/*jshint esversion: 6*/


module.exports = function(sequelize, DataTypes) {
  var Equipment = sequelize.define("Equipment", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL

  }, {
    classMethods: {
      associate: function(models) {
        Equipment.belongsTo(models.Event, {
          foreignKey: {
            name: 'event_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Equipment;
};