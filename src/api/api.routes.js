const express = require('express');
const router = express.Router();
const courseController = require('./Controllers/course/courseController')
//const studentController = require('./Controllers/course/studentController')
//const userController = require('./Controllers/course/userController')

router.get('/courses', courseController.index)

module.exports = router;