'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    TempUserId: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          User.hasMany(models.Timeline)
      }
    }
  });
  return User;
};