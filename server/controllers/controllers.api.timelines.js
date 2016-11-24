const models = require('../models')
const Timeline = models.Timeline

module.exports = {
    createTimeline: (req, res) => {
        Timeline.create({
            TempTimelineId: Date.now(),
            timeline: req.body.timeline,
            UserId: req.body.UserId
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllTimeline: (req, res) => {
        Timeline.findAll().then((data) => {
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