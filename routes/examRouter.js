const express = require("express");
const examRouter = express.Router();
const Controller = require('../controllers/examController')

examRouter.route('/manageExamMain').get(Controller.infoExam)
examRouter.route('/createExam').get(Controller.createExam)
examRouter.route('/openExam/:id').get(Controller.openExam)
examRouter.route('/manageExamTime/:id').get(Controller.infoTime)
examRouter.route('/examAddTime/:id').get(Controller.examAddTime)
examRouter.route('/examAddTime/:id').post(Controller.addTime)
examRouter.route('/examCancelTime/:id').get(Controller.deleteTime)
examRouter.route('/examRoom/:id').get(Controller.infoRoom)
examRouter.route('/examAddRoom/:id').get(Controller.examAddRoom)
examRouter.route('/examAddRoomExam/:id/:idRoom').get(Controller.addRoomExam)
examRouter.route('/cancelRoom/:id/:i_room/:idRoom').get(Controller.cancelRoom)
examRouter.route('/manageExamExaminer/:id/:i_room').get(Controller.infoExaminer)
examRouter.route('/examAddExaminer/:id/:i_room').get(Controller.examAddExaminer)
examRouter.route('/examAddingExaminer/:id/:user_id/:idRoom/:i_room').get(Controller.addExaminer)
examRouter.route('/deleteExaminer/:id/:idUser/:i_room').get(Controller.deleteExaminer)
examRouter.route('/manageExamSeat/:id/:i_room').get(Controller.infoStudent)
examRouter.route('/autoFillSeat/:id/:i_room').get(Controller.autoFillSeat)

//ดูข้อมูลสอบของนิสิต
examRouter.route('/examList/:id').get(Controller.infoExammination)

//ดูข้อมูลคุมสอบของอาจารย์
examRouter.route('/examinerList/:id').get(Controller.infoExaminerTeacherList)

//ดูข้อมูลคุมสอบของอาจารย์
examRouter.route('/examinerOfficerList/:id').get(Controller.infoExaminerOfficerList)

module.exports = examRouter;