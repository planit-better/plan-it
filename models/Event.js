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
        // Event.belongsTo(models.User);
      }
    }
  });

  return Event;
};