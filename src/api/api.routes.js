const express = require('express');
const router = express.Router();

const userExtractor = require('./middlewares/userExtractor')

const courseController = require('./Controllers/course/courseController')
const studentController = require('./Controllers/student/studentController')
const imageController = require('./Controllers/media/imageController')
const userController = require('./Controllers/user/userController')

router.get('/courses', courseController.index)
router.post('/courses/create', userExtractor, courseController.create)
router.delete('/courses/delete/:id', userExtractor, courseController.delete)
router.put('/courses/update/:id', userExtractor, courseController.update)

router.get('/students', userExtractor, studentController.index)
router.post('/students/create', userExtractor, studentController.create)
router.put('/students/update/:id', userExtractor, studentController.update)
router.delete('/students/delete/:id', userExtractor, studentController.delete)

router.post('/users/create', userController.create)
router.post('/users/login', userController.login)

router.get('/media/image/course/:id', imageController.showImageCourse)

module.exports = router;