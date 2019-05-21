const express = require("express");
const userRouter = express.Router();
const Controller = require('../controllers/userController')

//-------------------------------Login------------------------------
userRouter.route('/login').get(Controller.login)
userRouter.route('/login').post(Controller.check)

//-------------------------------MainAdmin------------------------------
userRouter.route('/mainStaff').get(Controller.mainStaff)

//-------------------------------MainStudent------------------------------
userRouter.route('/mainStudent/:id').get(Controller.mainStudent)

//-------------------------------MainTeacher------------------------------
userRouter.route('/mainTeacher/:id').get(Controller.mainTeacher)

//-------------------------------MainOfficer------------------------------
userRouter.route('/mainOfficer/:id').get(Controller.mainOfficer)


//-------------------------------Only Admin------------------------------
//-------------------------------show user------------------------------
userRouter.route("/managerUsers").get(Controller.infoUser)

//-------------------------------add user------------------------------
userRouter.route("/create").get(Controller.createUser)
userRouter.route("/create").post(Controller.add)

//-------------------------------delete user------------------------------
userRouter.route("/delete/:id").get(Controller.delete)

//-------------------------------update user------------------------------
userRouter.route("/edit/:id").get(Controller.editUser)
userRouter.route("/edit/:id").post(Controller.update)

module.exports = userRouter;
