const express = require("express");
const yearRouter = express.Router();
const Year = require("../models/year");
const Controller = require('../controllers/yearController')

//-------------------------------Main------------------------------
yearRouter.route('/manageYear').get(Controller.infoYear)

//-------------------------------add year------------------------------
yearRouter.route("/addYear").post(Controller.update)


module.exports = yearRouter;
