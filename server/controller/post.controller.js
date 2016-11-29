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
                    model: user
                }, {
                    model: comment,
                    include: [
                        {
                            model: user
                        }
                    ]
                }
            ],

            order: [
                [
                    'createdAt', 'DESC'
                ],
                [comment, 'createdAt', 'ASC']
            ]
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
        // post.findAll({
        //     include: [
        //         {
        //             model: user,
        //             include: [
        //                 {
        //                     model: comment
        //                 }
        //             ]
        //         }
        //     ],
        //     order: [
        //         ['id', 'DESC']
        //     ]
        // }).then((data) => {
        //     // res.json(data)
        //     function(callback) {
        //       let arrPost = []
        //       for (var i = 0; i < data.length; i++) {
        //         let email_user = data[i].dataValues.User.dataValues.email
        //         let id_user = data[i].dataValues.User.dataValues.id
        //         let image_user = data[i].dataValues.User.dataValues.image_url
        //         let usrnm_user = data[i].dataValues.User.dataValues.username
        //         let pwd_user = data[i].dataValues.User.dataValues.password
        //         let usrid_user = data[i].dataValues.UserId
        //         let post_content = data[i].dataValues.content
        //         let post_id = data[i].dataValues.id
        //         comment.findAll({
        //           where: {
        //             PostId : data[i].dataValues.id
        //           }
        //         }).then((comment_post) => {
        //           let postWithComment = {
        //             User: {
        //               email: email_user,
        //               id: id_user,
        //               image_url: image_user,
        //               username: usrnm_user,
        //               password: pwd_user,
        //             },
        //             UserId: usrid_user,
        //             content: post_content,
        //             id: post_id,
        //             Comment: comment_post
        //           }
        //           arrPost.push(postWithComment)
        //         })
        //       }
        //       callback(arrPost)
        //     }
        //     // setTimeout(function() {
        //     //   console.log('arrPost : ', arrPost);
        //     // }, 5000)
        //     res.json(arrPost)
        // })
    },
    createNewPost: function(req, res, next) {
        post.create({content: req.body.content, UserId: req.body.user_id}).then((data) => {
            // console.log(data);
        })
    },
    editPost: function(req, res, next) {
        // console.log('edit controller');
        // console.log('body : ', req.body);
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
        // console.log('req body : ', req.body);
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
