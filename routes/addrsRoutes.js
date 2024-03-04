const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addrsController')

router.get('/users/addresses', addressController.getAddresses)//get all address

module.exports = router;