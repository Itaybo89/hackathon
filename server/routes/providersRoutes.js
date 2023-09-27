const express = require('express');
const authenticateJWT = require('../middlewares/authenticateJWT.js');

const router = express.Router();

const providersController = require('../controllers/providersController');
console.log("Type of authenticateJWT: ", typeof authenticateJWT);


router.post('/', providersController.addProvider);

// router.post('/',authenticateJWT, providersController.adddish);

// router.post('/currentlyonmenu', authenticateJWT, providersController.currentlyonmenu);

// router.post('/currentlyoffmenu', authenticateJWT, providersController.currentlyoffmenu);
// router.delete('/:id',authenticateJWT, providersController.deleteDish);

// router.patch('/edit/:id', authenticateJWT, providersController.editdish);




module.exports = router;
