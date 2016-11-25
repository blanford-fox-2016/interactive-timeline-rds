'use strict'
var models = require('../models')
var comment = models.Comment

module.exports = {
  getAllComment: function(req, res, next) {
    comment.findAll({
        include: [{
            model: models.Post,
            through: {
                where: {
                    PostId: req.body.id
                }
            }
        }]
    }).then((data) => {
        res.json(data)
    })
  },
  createNewComment: function(req, res, next) {
      comment.create({
        content: req.body.content,
        UserId: 1,
        PostId: 1
       }).then((data) => {
          res.json(data)
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
          data.update({ content: req.body.content }).then((result) => {
              res.json(result)
          })
      })
  },
  deleteComment: function(req, res, next) {
      console.log('req body : ',req.body);
      comment.destroy({
          where: {
              id: req.body.id
          }
      }).then((data) => {
          if (data > 0) {
              res.json({ message: 'Delete successfully' })
          } else {
              res.json({ message: 'ID not found' })
          }
      })
  },

}
