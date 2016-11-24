const models = require('../models')
const Timeline = models.Timeline
const User = models.User

module.exports = {
    createTimeline: (req, res) => {
        Timeline.create({
            TempTimelineId: Date.now(),
            timeline: req.body.timeline,
            UserId: req.body.UserId
        }).then((data) => {
            Timeline.findOne({
                include: [
                    {
                        model: User
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