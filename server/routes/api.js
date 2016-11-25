var express = require('express');
var router = express.Router();
const postController = require('../controller/post.controller')
const commentController = require('../controller/comment.controller');

/* POST Model ROUTE */
router.get('/post', postController.getAllPost);
router.post('/post', postController.createNewPost);
router.put('/post', postController.editPost);
router.delete('/post', postController.deletePost);

router.post('/comment', commentController.createNewComment)
router.put('/comment', commentController.editComment)
router.delete('/comment', commentController.deleteComment)

module.exports = router;
