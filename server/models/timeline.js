'use strict';
module.exports = function(sequelize, DataTypes) {
  var Timeline = sequelize.define('Timeline', {
      TempTimelineId: DataTypes.STRING,
      timeline: DataTypes.STRING,
      UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          Timeline.belongsTo(models.User)
      }
    }
  });
  return Timeline;
};