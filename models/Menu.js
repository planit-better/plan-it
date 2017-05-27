/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    type_of_food: DataTypes.STRING,
    cost_per_person:DataTypes.DECIMAL,
    restaurant_name: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Menu.belongsTo(models.Event, {
          foreignKey: {
            name: 'event_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Menu;
};