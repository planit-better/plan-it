/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define("Guest", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.NUMBER,
    staff: DataTypes.BOOLEAN,
    will_attend: DataTypes.BOOLEAN,
    accompanying_guests: DataTypes.INTEGER,
    can_drink: DataTypes.BOOLEAN,
    diet_restriction: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Guest.belongsTo(models.Tasks, {
          foreignKey: {
            name: 'tasks_id',
            allowNull: true
          }
        });

      }
    }
  });

  return Guest;
};