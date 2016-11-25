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
            res.json(data)
        })
    },
    loginProcess: function(req, res) {
      console.log('success');
      console.log('req : ', req.body);
    }
}
