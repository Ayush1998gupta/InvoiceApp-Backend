const express = require('express');
const router = express.Router();
const inviceController = require('../controller/index');

// @post request to getInvoice
router.post('/getInvoice', inviceController.getInvoice);

// @get request to get home
router.get('/', inviceController.getHome);

module.exports = router;
