var express = require('express');
var router = express.Router();
const postController = require('../controller/post.controller')

/* POST Model ROUTE */
router.get('/post', postController.getAllPost);
router.post('/post', postController.createNewPost);
router.put('/post', postController.editPost);
router.delete('/post', postController.deletePost);

module.exports = router;
