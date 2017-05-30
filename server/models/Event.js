/*jshint esversion: 6*/


module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    name: DataTypes.STRING,
    location_name: DataTypes.STRING,
    location_address: DataTypes.STRING,
    event_date: DataTypes.DATE,
    event_time: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {
          foreignKey: {
            name: 'user_id',
            allowNull: true
          }
        });
        Event.hasMany(models.Equipment, {
          foreignKey: {
            name: 'equipment_id',
            allowNull: true
          }
        });
        Event.hasMany(models.Guest, {
          foreignKey: {
            name: 'guest_id',
            allowNull: true
          }
        });
        Event.hasMany(models.Menu, {
          foreignKey: {
            name: 'menu_id',
            allowNull: true
          }
        });
        Event.hasMany(models.Task, {
          foreignKey: {
            name: 'task_id',
            allowNull: true
          }
        });
        Event.hasMany(models.Contractors, {
          foreignKey: {
            name: 'contractors_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Event;
};