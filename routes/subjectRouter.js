const express = require("express");
const subjectRouter = express.Router();
const Controller = require('../controllers/subjectController')

subjectRouter.route('/manageSubject').get(Controller.infoSubject)
subjectRouter.route('/addSubject').get(Controller.addSubject)
subjectRouter.route('/addSubject').post(Controller.add)
subjectRouter.route("/deleteSubject/:id").get(Controller.delete)
subjectRouter.route("/editSubject/:id").get(Controller.editSubject)
subjectRouter.route("/editSubject/:id").post(Controller.update)



module.exports = subjectRouter;