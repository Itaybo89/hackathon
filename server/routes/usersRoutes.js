const express = require('express');
const authenticateJWT = require('../middlewares/authenticateJWT.js');

const router = express.Router();

const UsersController = require('../controllers/usersController');

router.post('/', UsersController.addUser);

router.post('/login', authenticateJWT, UsersController.loginUser)

router.patch('/profile', authenticateJWT, UsersController.updateUserProfile);

// router.delete('/:id', authenticateJWT, UsersController.deleteUser);

module.exports = router;

