const express = require('express');
const router = express.Router();
const apiController = require('./apiController')

router.get('/', apiController.index)


module.exports = router;