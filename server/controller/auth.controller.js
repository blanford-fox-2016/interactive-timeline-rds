'use strict'
const models = require('../models')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const user = models.User

module.exports = {
    registerProcess: function(req, res) {
        user.create({
            name: req.body.name,
            username: req.body.username,
            password: crypto.createHash('md5').update(req.body.password).digest("hex"),
            email: req.body.email,
            image_url: req.body.image_url
        }).then((data) => {
            let token = jwt.sign({
                id: data.id,
                name: data.name,
                username: data.username,
                email: data.email,
                image_url: data.image_url
            }, process.env.SECRET, {expiresIn: '1h'})
            console.log('register token created : ', token);
            res.status(200).json(token)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    loginProcess: function(req, res) {
        user.find({
            where: {
                username: req.body.username
            }
        }).then((data) => {
            let token = jwt.sign({
                id: data.id,
                name: data.name,
                username: data.username,
                email: data.email,
                image_url: data.image_url
            }, process.env.SECRET, {expiresIn: '1h'})
            console.log('login token created : ', token);
            res.status(200).json(token)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }
}
