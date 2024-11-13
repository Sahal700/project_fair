const express = require('express')
// import user controller
const userController = require('./controllers/userController')
// import projectController
const projectController = require('./controllers/projectController')
// import jwtmiddleware
const jwtMiddleware = require('./middleware/jwtMiddleware1')
// 
const multerconfig = require('./middleware/multerMiddleware')

// instance router
const router = new express.Router()

// register
router.post('/register',userController.register)

//login
router.post('/login',userController.login) 
// addproject
router.post('/add-project',jwtMiddleware,multerconfig.single("projectImage"),projectController.addProjectController) 
// get all Project 
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectController)
// get home project
router.get('/home-projects',projectController.getHomeProjectController)
// get user project
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectController)
// remove user project 
router.delete('/remove-userproject/:id',jwtMiddleware,projectController.removeUserProjectController)
// update user project
router.put('/update-userproject/:id',jwtMiddleware,multerconfig.single("projectImage"),projectController.updateUserProjectController)
// updat user profile
router.put('/update-userprofile',jwtMiddleware,multerconfig.single("profile"),userController.editProfileUserController)

// exporting
module.exports = router