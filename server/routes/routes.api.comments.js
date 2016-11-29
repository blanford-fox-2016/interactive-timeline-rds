var express = require('express');
var router = express.Router();
const commentsController = require('../controllers/controllers.api.comments')

/* GET home page. */
router.get('/', commentsController.getAllComments)
router.get('/:id', commentsController.getCommentById)
router.post('/', commentsController.createComment)
router.put('/', commentsController.updateComment)
router.delete('/', commentsController.deleteComment)

module.exports = router;
