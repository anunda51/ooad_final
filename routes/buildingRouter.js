const express = require("express");
const buildingRouter = express.Router();
const Controller = require('../controllers/buildingController')

buildingRouter.route('/manageBuilding').get(Controller.infoBuilding)
buildingRouter.route('/addBuilding').get(Controller.addBuilding)
buildingRouter.route('/addBuilding').post(Controller.add)
buildingRouter.route('/deleteBuilding/:id').get(Controller.delete)
buildingRouter.route('/editBuilding/:id').get(Controller.editBuilding)
buildingRouter.route('/editBuilding/:id').post(Controller.update)

module.exports = buildingRouter;