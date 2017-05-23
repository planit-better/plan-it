/*jshint esversion: 6 */
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  })
}