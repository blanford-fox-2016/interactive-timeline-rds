'use strict'
var models = require('../models')
var post = models.Post
var user = models.User
var comment = models.Comment

module.exports = {
    getAllComment: function(req, res, next) {
        comment.findAll({
            include: [
                {
                    model: user,
                    include: [
                        {
                            model: post
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
    createNewComment: function(req, res, next) {
        comment.create({content: req.body.content, UserId: req.body.UserId, PostId: req.body.PostId}).then((data) => {
            // res.json(data)
        })
    },
    editComment: function(req, res, next) {
        console.log('edit controller');
        console.log('body : ', req.body);
        comment.findOne({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            data.update({content: req.body.content}).then((result) => {
                res.json(result)
            })
        })
    },
    deleteComment: function(req, res, next) {
        console.log('req body : ', req.body);
        comment.destroy({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            if (data > 0) {
                console.log('Delete success');
                // res.json({message: 'Delete successfully'})
            } else {
                console.log('ID not found !');
                // res.json({message: 'ID not found'})
            }
        })
    }
}
