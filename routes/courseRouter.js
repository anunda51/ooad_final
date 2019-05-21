const express = require("express");
const courseRouter = express.Router();
const Controller = require('../controllers/courseController')

courseRouter.route('/manageCourse').get(Controller.infoCourse)
courseRouter.route('/addCourse').get(Controller.addCourse)
courseRouter.route('/searchSubject').post(Controller.search)
courseRouter.route('/addCourse').post(Controller.add)
courseRouter.route('/listTeacher/:id').get(Controller.listTeacher)
courseRouter.route('/addTeacher/:id').get(Controller.addTeacher)
courseRouter.route('/chooseTeacher/:id/:idTeacher').get(Controller.chooseTeacher)
courseRouter.route('/listStudent/:id').get(Controller.listStudent)
courseRouter.route('/addStudent/:id').get(Controller.addStudent)
courseRouter.route('/autoAddStudent/:id').get(Controller.autoAddStudent)
courseRouter.route('/addStudent/:id').post(Controller.insertStudent)

module.exports = courseRouter;