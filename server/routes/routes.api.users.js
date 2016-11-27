var express = require('express');
var router = express.Router();
var usersController = require('../controllers/controllers.api.users')

/* GET users listing. */
router.post('/register', usersController.registerUser)
router.post('/login', usersController.loginUser)

module.exports = router;
