'use strict'
var models = require('../models')
var post = models.Post
var user = models.User
var comment = models.Comment

module.exports = {
    getAllPost: function(req, res, next) {
        post.findAll({
            include: [
                {
                    model: user,
                    include: [
                        {
                            model: comment
                        }
                    ]
                }
            ],
            order: [
                ['id', 'DESC']
            ]
        }).then((data) => {
            res.json(data)
        })
    },
    createNewPost: function(req, res, next) {
        post.create({content: req.body.content, UserId: req.body.user_id}).then((data) => {
            console.log(data);
        })
    },
    editPost: function(req, res, next) {
        console.log('edit controller');
        console.log('body : ', req.body);
        post.findOne({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            data.update({content: req.body.content}).then((result) => {
                res.json(result)
            })
        })
    },
    deletePost: function(req, res, next) {
        console.log('req body : ', req.body);
        post.destroy({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            if (data > 0) {
                res.json({message: 'Delete successfully'})
            } else {
                res.json({message: 'ID not found'})
            }
        })
    },
    showPostComment: function(req, res, next) {
        post.findAll({
            include: [
                {
                    model: models.User,
                    through: {
                        // atttributes: ['power'],
                        where: {
                            CommentId: req.body.id
                        }
                    }
                }
            ]
        }).then((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].dataValues.id == req.body.id) {
                    res.json(data[i].dataValues)
                } else {}
            }
        })
    }
}
