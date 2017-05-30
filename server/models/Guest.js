/*jshint esversion: 6*/


module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define("Guest", {
    name: DataTypes.STRING,
    number: DataTypes.BIGINT,
    email: DataTypes.STRING,
    will_attend: DataTypes.BOOLEAN,
    accompanying_guests: DataTypes.INTEGER,
    can_drink: DataTypes.BOOLEAN,
    diet_restriction: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Guest.belongsTo(models.Event, {
          foreignKey: {
            name: 'event_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Guest;
};