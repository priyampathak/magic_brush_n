const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController')


router.get('/users', userController.getUsers);//get all users
router.get('/:id', userController.verifyToken, userController.getUserById)// get user by id pass token to it
router.post('/users/signup', userController.createNewClientUser)// create client user
router.post('/partners/signup', userController.createNewProviderUser)// create a provider user
router.post('/users/login', userController.loginUser)//login

module.exports = router;