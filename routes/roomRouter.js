const express = require("express");
const roomRouter = express.Router();
const Controller = require('../controllers/roomController')

roomRouter.route('/manageRoom').get(Controller.infoRoom)
roomRouter.route('/addRoom').get(Controller.addRoom)
roomRouter.route('/addRoom').post(Controller.add)
roomRouter.route("/deleteRoom/:id").get(Controller.delete)
roomRouter.route("/editRoom/:id").get(Controller.editRoom)
roomRouter.route("/editRoom/:id").post(Controller.update)

module.exports = roomRouter;