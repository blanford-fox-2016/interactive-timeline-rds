'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Users',
          key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Post.hasMany(models.Comment)
        Post.belongsTo(models.User)
      }
    }
  });
  return Post;
};
