/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Contractors = sequelize.define("Contractors", {
    company_name: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    contact: DataTypes.INTEGER,
    date_hired: DataTypes.DATEONLY,
    deadline: DataTypes.DATEONLY

  }, {
    classMethods: {
      associate: function(models) {
        // Contractors.belongsTo(models.User);
      }
    }
  });

  return Contractors;
};