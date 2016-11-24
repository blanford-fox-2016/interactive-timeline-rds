'use strict';
module.exports = function(sequelize, DataTypes) {
  var Timeline = sequelize.define('Timeline', {
    TempTimelineId: DataTypes.STRING,
    timeline: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Timeline;
};