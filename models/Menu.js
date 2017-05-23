/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    type_of_food: DataTypes.STRING,
    cost_per_person:DataTypes.MONEY,
    restaurant_name: DataTypes.STRING,
    state_tax: DataTypes.MONEY,
    misc_cost: DataTypes.MONEY,
    total_cost: DataTypes.MONEY


  }, {
    classMethods: {
      associate: function(models) {
        Menu.belongsTo(models.Task, {
          as: 'Food Menu',
          foreignKey: {
            name: 'task_id',
            allowNull: true
          }
        });
        Menu.hasMany(models.Contractors, {
          foreignKey: {
            name: 'contractors_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Menu;
};