const Year = require('../models/year');
const Building = require('../models/building');

module.exports = {
    infoBuilding: (req, res) => {
        Building.find(function (err, building) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageBuilding/manageBuilding', { building: building, year: year, err: false });
                    } else {
                        res.render('staff/manageBuilding/manageBuilding', { building: building, err: true });
                    }
                }
            });
        });
    },
    addBuilding: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                res.render('staff/manageBuilding/addBuilding', { err: false, year: year });
            } else {
                res.render('staff/manageBuilding/addBuilding', { err: true });
            }
        });
    },
    add: (req, res) => {
        const building = new Building(req.body);
        Building.findOne({ idBuilding: building.idBuilding }, function (err, check) {
            if (check) {
                res.redirect("/reg/addBuilding");
            } else {
                building
                    .save()
                    .then(building => {
                        res.redirect("manageBuilding");
                    })
                    .catch(err => {
                        res.status(400).send("unable to save to database");
                    });
            }
        });

    },
    delete: (req, res) => {
        Building.findByIdAndRemove({ _id: req.params.id }, function (err, building) {
            if (err) res.json(err);
            else res.redirect("/reg/manageBuilding");
        });
    },
    editBuilding: (req, res) => {
        const id = req.params.id;
        Building.findById(id, function (err, building) {
            Year.findOne(function (err, year) {
                if (year) {
                    res.render("staff/manageBuilding/editBuilding", { building: building, err: false, year: year });
                } else {
                    res.render("staff/manageBuilding/editBuilding", { building: building, err: true });
                }
            });
        });
    },
    update: (req, res) => {
        Building.findById(req.params.id, function (err, building) {
            if (!building) return next(new Error("Could not load Document"));
            else {
                // do your updates here
                building.idBuilding = req.body.idBuilding;
                building.name = req.body.name; // รับค่าจากหน้า ฟอร์ม
                building.floor = req.body.floor;

                building
                    .save()
                    .then(building => {
                        res.redirect("/reg/manageBuilding");
                    })
                    .catch(err => {
                        res.status(400).send("unable to update the database");
                    });
            }
        });
    }
}