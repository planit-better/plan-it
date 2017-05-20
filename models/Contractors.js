/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Contractors = sequelize.define("Contractors", {
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // Contractors.belongsTo(models.User);
      }
    }
  });

  return Contractors;
};