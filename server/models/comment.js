'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
      TempCommentId: DataTypes.STRING,
      comment: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      TimelineId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          Comment.belongsTo(models.User)
          Comment.belongsTo(models.Timeline)
      }
    }
  });
  return Comment;
};