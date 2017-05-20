/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Tasks = sequelize.define("Tasks", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    assigned_to: DataTypes.STRING,
    deadline: DataTypes.DATE

  }, {
    classMethods: {
      associate: function(models) {
        // Tasks.belongsTo(models.User);
      }
    }
  });

  return Tasks;
};