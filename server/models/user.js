'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            validate: {
                isUnique: (value, next) => {
                    User.find({
                        where: {
                            username: value
                        },
                        attributes: ['id']
                    }).done((error, user) => {
                        if (error) {
                            console.log('error unique: ', error);
                            return next(error);
                        } else if (user) {
                            console.log('username has been used');
                            return next({message: 'username has been used'});
                        } else {
                            console.log('next ?');
                            next();
                        }
                    });
                }
            }
        },
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        image_url: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Post)
                User.hasMany(models.Comment)
            }
        }
    });
    return User;
};
