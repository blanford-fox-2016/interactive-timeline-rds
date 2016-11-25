var express = require('express');
var router = express.Router();
const postController = require('../controller/post.controller');
const commentController = require('../controller/comment.controller');
const authController = require('../controller/auth.controller');
const passport = require('passport');

/* POST Model ROUTE */
router.get('/post', postController.getAllPost);
router.post('/post', postController.createNewPost);
router.put('/post', postController.editPost);
router.delete('/post', postController.deletePost);

router.get('/comment', commentController.getAllComment)
router.post('/comment', commentController.createNewComment)
router.put('/comment', commentController.editComment)
router.delete('/comment', commentController.deleteComment)

router.post('/auth/register', authController.registerProcess)
router.post('/auth/login', passport.authenticate('local'), authController.loginProcess)


module.exports = router;
