/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Tasks = sequelize.define("Tasks", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    deadline: DataTypes.DATE,
    assigned_to: DataTypes.STRING,
    price: DataTypes.NUMBER

  }, {
    classMethods: {
      associate: function(models) {
        Tasks.belongsToMany(models.Guest, {
          foreignKey: {
            name: 'assigned_to',
            allowNull: false
          }
        });
        Tasks.belongsTo(models.Contractors, {
          as: 'Contractor',
          foreignKey: {
            name: 'contractor_id',
            allowNull: true
          }
        });
        Tasks.belongsTo(models.Menu, {
          as: 'Menu',
          foreignKey: {
            name: 'menu_id',
            allowNull: true
          }
        });
        Tasks.belongsTo(models.Equipment, {
          as: 'Equipment',
          foreignKey: {
            name: 'equipment_id',
            allowNull: true
          }
        });
      }
    }
  });

  return Tasks;
};