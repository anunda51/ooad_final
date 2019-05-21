const Building = require('../models/building');
const Room = require('../models/room');
const Year = require("../models/year");

module.exports = {
    infoRoom: (req, res) => {
        Room.find(function (err, rooms) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageRoom/manageRoom', { rooms: rooms, err: false, year: year });
                    } else {
                        res.render('staff/manageRoom/manageRoom', { rooms: rooms, err: true });
                    }
                }
            });
        });
    },
    addRoom: (req, res) => {
        Building.find(function (err, building) {
            if (building) {
                Year.findOne(function (err, year) {
                    if (year) {
                        res.render('staff/manageRoom/addRoom', { err: false, year: year, building: building });
                    } else {
                        res.render('staff/manageRoom/addRoom', { err: true, building: building });
                    }
                });
            }
        });
    },
    add: (req, res) => {
        const room = new Room(req.body);
        room.seat = parseInt(req.body.row) * parseInt(req.body.column)
        // console.log(room);
        Room.find({ idRoom: room.idRoom }, function (err, check) {
            if (check) {
                res.redirect("/reg/addRoom");
            } else {
                room
                    .save()
                    .then(room => {
                        res.redirect("manageRoom");
                    })
                    .catch(err => {
                        res.status(400).send("unable to save to database");
                    });
            }
        });

    },
    delete: (req, res) => {
        Room.findByIdAndRemove({ _id: req.params.id }, function (err, coin) {
            if (err) res.json(err);
            else res.redirect("/reg/manageRoom");
        });
    },
    editRoom: (req, res) => {
        const id = req.params.id;
        Room.findById(id, function (err, room) {
            Building.find(function (err, building) {
                if (building) {
                    Year.findOne(function (err, year) {
                        if (year) {
                            res.render("staff/manageRoom/editRoom", { room: room, err: false, year: year, building: building });
                        } else {
                            res.render("staff/manageRoom/editRoom", { room: room, err: true, building: building });
                        }
                    });
                }
            });

        });
    },
    update: (req, res) => {
        Room.findById(req.params.id, function (err, room) {
            if (!room) return next(new Error("Could not load Document"));
            else {
                // do your updates here
                room.idRoom = req.body.idRoom;
                room.building = req.body.building;
                room.floor = req.body.floor;
                room.type = req.body.type;
                room.row = req.body.row;
                room.column = req.body.column;
                room.seat = parseInt(req.body.row) * parseInt(req.body.column);

                room
                    .save()
                    .then(room => {
                        res.redirect("/reg/manageRoom");
                    })
                    .catch(err => {
                        res.status(400).send("unable to update the database");
                    });
            }
        });
    }
}