const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const UsersController = require('../controllers/users');

router.post('/signup', UsersController.user_sign_up);

router.post('/login', UsersController.users_log_in);

router.delete('/:userID', checkAuth, UsersController.user_delete);

module.exports = router;