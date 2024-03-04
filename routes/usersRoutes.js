const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController')


router.get('/users', userController.getUsers);//get all users
router.get('/:id', userController.getUserById)// get user by id
router.post('/users/signup', userController.createNewClientUser)// create client user
router.post('/services/signup', userController.createNewProviderUser)// create a provider user
router.post('/users/login', userController.loginUser)//login

module.exports = router;