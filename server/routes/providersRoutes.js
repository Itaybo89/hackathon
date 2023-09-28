const express = require('express');
const authenticateJWT = require('../middlewares/authenticateJWT.js');

const router = express.Router();

const providersController = require('../controllers/providersController');
console.log("Type of authenticateJWT: ", typeof authenticateJWT);



router.post('/', providersController.addProvider);

router.post('/adddish', providersController.addDish);

router.post('/currentlyonmenu', authenticateJWT, providersController.currentlyOnMenu);

router.post('/currentlyoffmenu', authenticateJWT, providersController.currentlyOffMenu);

router.get('/restaurant/:restaurantId', authenticateJWT, providersController.getAllDishes);



// router.delete('/:id',authenticateJWT, providersController.deleteDish);

// router.patch('/edit/:id', authenticateJWT, providersController.editDish);




module.exports = router;
