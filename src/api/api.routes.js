const express = require('express');
const router = express.Router();
const courseController = require('./Controllers/course/courseController')
const studentController = require('./Controllers/student/studentController')
const imageController = require('./Controllers/media/imageController')
//const userController = require('./Controllers/user/userController')

router.get('/courses', courseController.index)
router.post('/courses/create', courseController.create)
router.delete('/courses/delete/:id', courseController.delete)
router.put('/courses/update/:id', courseController.update)

router.get('/students', studentController.index)
router.post('/students/create', studentController.create)
router.put('/students/update/:id', studentController.update)
router.delete('/students/delete/:id', studentController.delete)

//router.post('/users/login', userController.login)

router.get('/media/image/course/:id', imageController.showImageCourse)

module.exports = router;