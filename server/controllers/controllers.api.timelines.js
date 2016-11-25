const models = require('../models')
const Timeline = models.Timeline
const Comment = models.Comment
const User = models.User

module.exports = {
    createTimeline: (req, res) => {
        Timeline.create({
            TempTimelineId: req.body.TempTimelineId,
            timeline: req.body.timeline,
            UserId: req.body.UserId
        }).then((data) => {
            Timeline.findOne({
                include: [
                    {
                        model: User
                    },
                    {
                        model: Comment
                    }
                ],

                where: {
                    TempTimelineId: data.TempTimelineId
                }
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllTimeline: (req, res) => {
        Timeline.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    include: [{model:User}]
                }
            ],

            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'ASC']
            ]
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getTimelineById: (req, res) => {
        Timeline.findOne({
            where: {
                TempTimelineId: req.body.TempTimelineId
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    deleteTimeline: (req, res) => {
        Timeline.destroy({
            where: {
                TempTimelineId: req.body.TempTimelineId
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    updateTimeline: (req, res) => {
        Timeline.update({
            timeline: req.body.timeline,
        }, {
            where: {
                TempTimelineId: req.body.TempTimelineId
            }
        }).then(() => {
            Timeline.findOne({
                where: {
                    TempTimelineId: req.body.TempTimelineId
                }
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    }
}