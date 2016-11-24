const models = require('../models')
const Timeline = models.Timeline
const Comment = models.Comment
const User = models.User

module.exports = {
    createComment: (req, res) => {
        Comment.create({
            TempCommentId: req.body.TempCommentId,
            comment: req.body.comment,
            TimelineId: req.body.TimelineId,
            UserId: req.body.UserId
        }).then((data) => {
            Comment.findOne({
                include: [
                    {
                        model: User
                    },
                    {
                        model: Timeline
                    }
                ],

                where: {
                    TempCommentId: data.TempCommentId
                }
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllComments: (req, res) => {
        Comment.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Timeline
                }
            ],

            order: [
                ['createdAt', 'DESC']
            ]
        }).then((data) => {
            console.log(data)
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getCommentById: (req, res) => {
        Comment.findOne({
            where: {
                TempCommentId: req.body.TempCommentId
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    deleteComment: (req, res) => {
        Comment.destroy({
            where: {
                TempCommentId: req.body.TempCommentId
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    updateComment: (req, res) => {
        Comment.update({
            comment: req.body.comment,
        }, {
            where: {
                TempCommentId: req.body.TempCommentId
            }
        }).then(() => {
            Comment.findOne({
                where: {
                    TempCommentId: req.body.TempCommentId
                }
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    }
}