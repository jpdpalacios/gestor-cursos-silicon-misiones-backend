const express = require('express');
const router = express.Router();
const courseController = require('./Controllers/course/courseController')
const studentController = require('./Controllers/student/studentController')
//const userController = require('./Controllers/user/userController')

router.get('/courses', courseController.index)
router.post('/courses/create', courseController.create)
router.delete('/courses/delete/:id', courseController.delete)

router.get('/students', studentController.index)
router.post('/students/create', studentController.create)
router.delete('/students/delete/:id', studentController.delete)


module.exports = router;