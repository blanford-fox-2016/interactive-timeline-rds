'use strict';
var passportLocalSequelize = require('passport-local-sequelize')
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    myhash: DataTypes.STRING(1024),
    mysalt: DataTypes.STRING,
    email: DataTypes.STRING,
    photo_URL: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.Timelines)
        Users.hasMany(models.Comments)
      }
    }
  });

  passportLocalSequelize.attachToUser(Users, {
    usernameField: 'username',
    hashField: 'myhash',
    saltField: 'mysalt'
  })

  return Users;
};
