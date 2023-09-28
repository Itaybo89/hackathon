const express = require('express');
const authenticateJWT = require('../middlewares/authenticateJWT.js');

const router = express.Router();

const UsersController = require('../controllers/usersController');

router.post('/', UsersController.addUser);

router.post('/login',  UsersController.loginUser)

router.get('/details', authenticateJWT, UsersController.getUserDetails);
// router.delete('/:id', authenticateJWT, UsersController.deleteUser);
// router.patch('/profile', authenticateJWT, UsersController.updateUserProfile);



module.exports = router;

