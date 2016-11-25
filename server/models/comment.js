'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    UserId: {
      type: DataTypes.STRING,
      references: {
          model: 'Users',
          key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    PostId: {
      type: DataTypes.STRING,
      references: {
          model: 'Posts',
          key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Comment.belongsTo(models.User)
        Comment.belongsTo(models.Post)
      }
    }
  });
  return Comment;
};
