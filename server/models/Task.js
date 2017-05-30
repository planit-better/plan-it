/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    assigned_to: DataTypes.STRING,
    deadline: DataTypes.DATE

  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.Event, {
          foreignKey: {
            name: 'event_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Task;
};
