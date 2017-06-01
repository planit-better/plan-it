/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    deadline: DataTypes.DATE,
    complete: DataTypes.BOOLEAN

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
