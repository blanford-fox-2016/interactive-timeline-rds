const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.User

module.exports = {
    registerUser: (req, res) => {
        User.create({
            TempUserId: req.body.TempUserId,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    loginUser: (req, res) => {
        User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then((data) => {
            res.status(200).json({
                token: jwt.sign({
                    id: data.id,
                    username: data.username,
                    email: data.email
                }, process.env.SESSION_SECRET)
            })
        }).catch((err) => {
            res.json(err)
        })
    }
}