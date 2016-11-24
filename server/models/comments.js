'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define('Comments', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Comments.belongsTo(models.Users)
        Comments.belongsTo(models.Timelines)
      }
    }
  });
  return Comments;
};
