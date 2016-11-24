'use strict';
module.exports = function(sequelize, DataTypes) {
  var Timelines = sequelize.define('Timelines', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Timelines.belongsTo(models.Users)
        Timelines.hasMany(models.Comments)
      }
    }
  });
  return Timelines;
};
