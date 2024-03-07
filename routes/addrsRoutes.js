const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addrsController')

router.get('/user/addresses', addressController.getAddresses)//get all address
router.get('/user/addresses/:id', addressController.getAddressById)//get address by ID

module.exports = router;