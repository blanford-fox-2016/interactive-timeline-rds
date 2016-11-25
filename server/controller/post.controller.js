'use strict'
var models = require('../models')
var post = models.Post

module.exports = {
    getAllPost: function(req, res, next) {
        post.findAll({ order: [['id', 'DESC']] }).then((data) => {
            res.json(data)
        })
    },
    createNewPost: function(req, res, next) {
        post.create({
          content: req.body.content,
          UserId: 1
         }).then((data) => {
            res.json(data)
        })
    },
    editPost: function(req, res, next) {
        post.findOne({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            data.update({ content: req.body.content }).then((result) => {
                res.json(result)
            })
        })
    },
    deletePost: function(req, res, next) {
        console.log(req.body);
        post.destroy({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            if (data > 0) {
                res.json({ message: 'Delete successfully' })
            } else {
                res.json({ message: 'ID not found' })
            }
            res.json(data)
        })
    },
    showPostComment: function(req, res, next) {
        post.findAll({
            include: [{
                model: models.Comment,
                through: {
                    // atttributes: ['power'],
                    where: {
                        CommentId: req.body.id
                    }
                }
            }]
        }).then((data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].dataValues.id == req.body.id) {
                    res.json(data[i].dataValues)
                } else {}
            }
        })
    }
  }
