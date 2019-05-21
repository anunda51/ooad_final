const User = require("../models/user");
const Year = require("../models/year");

module.exports = {
    login: (req, res) => {
        res.render('login', { err: false });
    },
    check: (req, res) => {
        const username = req.body.nameUser;
        const password = req.body.namePassword;
        console.log(username)
        User.findOne({ idUser: username, password: password }, function (err, user) {
            if (err) {
                res.render("login", { err: true });
            } else {
                if (user) {
                    if (user.selectType === 'admin') {
                        res.redirect('mainStaff');
                    } else if (user.selectType === 'นิสิต') {
                        res.redirect(`/reg/mainStudent/${user._id}`)
                    } else if (user.selectType === 'อาจารย์') {
                        res.redirect(`/reg/mainTeacher/${user._id}`);
                    } else if (user.selectType === 'เจ้าหน้าที่') {
                        res.redirect(`/reg/mainOfficer/${user._id}`);
                    } else {
                        res.render("login", { err: true });
                    }
                } else {
                    res.render("login", { err: true });
                }
            }
        });
    },
    mainStaff: (req, res) => {
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                if (year) {
                    res.render("staff/mainStaff", { err: false, year: year }); //render collection "users"
                } else {
                    res.render("staff/mainStaff", { err: true });
                }
            }
        });
    },
    mainStudent: (req, res) => {
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                User.findById({ _id: req.params.id }, function (err, user) {
                    if (year) {
                        res.render("student/mainStudent", { err: false, year: year, user: user }); //render collection "users"
                    } else {
                        res.render("student/mainStudent", { err: true, user: user });
                    }
                });
            }
        });
    },
    mainTeacher: (req, res) => {
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                User.findById({ _id: req.params.id }, function (err, user) {
                    if (year) {
                        res.render("teacher/mainTeacher", { err: false, year: year, user: user }); //render collection "users"
                    } else {
                        res.render("teacher/mainTeacher", { err: true, user: user });
                    }
                });
            }
        });
    },
    mainOfficer: (req, res) => {
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                User.findById({ _id: req.params.id }, function (err, user) {
                    if (year) {
                        res.render("officer/mainOfficer", { err: false, year: year, user: user }); //render collection "users"
                    } else {
                        res.render("officer/mainOfficer", { err: true, user: user });
                    }
                });
            }
        });
    },
    infoUser: (req, res) => {
        User.find(function (err, users) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err);
                } else {
                    if (year) {
                        res.render("staff/manageUsers/managerUsers", { users: users, err: false, year: year }); //render collection "users"
                    } else {
                        res.render("staff/manageUsers/managerUsers", { users: users, err: true });
                    }
                }
            });
        });
    },
    createUser: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                res.render("staff/manageUsers/addUsers", { err: false, year: year, isEmpty: false });
            } else {
                res.render("staff/manageUsers/addUsers", { err: true });
            }
        });
    },
    add: (req, res) => {
        const user = new User(req.body);
        console.log(user);
        User.findOne({ idUser: user.idUser }, function (err, check) {
            if (check) {
                res.redirect("/reg/create");
            } else {
                user
                    .save()
                    .then(user => {
                        res.redirect("managerUsers");
                    })
                    .catch(err => {
                        res.status(400).send("unable to save to database");
                    });
            }
        });
    },
    delete: (req, res) => {
        User.findByIdAndRemove({ _id: req.params.id }, function (err, coin) {
            if (err) res.json(err);
            else res.redirect("/reg/managerUsers");
        });
    },
    editUser: (req, res) => {
        const id = req.params.id;
        User.findById(id, function (err, user) {
            Year.findOne(function (err, year) {
                if (year) {
                    res.render("staff/manageUsers/editUsers", { user: user, err: false, year: year });
                } else {
                    res.render("staff/manageUsers/editUsers", { user: user, err: true });
                }
            });
        });
    },
    update: (req, res) => {
        User.findById(req.params.id, function (err, user) {
            if (!user) return next(new Error("Could not load Document"));
            else {
                // do your updates here
                user.idUser = req.body.idUser;
                user.firstname = req.body.firstname; // รับค่าจากหน้า ฟอร์ม
                user.lastname = req.body.lastname;
                user.selectType = req.body.selectType;

                user
                    .save()
                    .then(user => {
                        res.redirect("/reg/managerUsers");
                    })
                    .catch(err => {
                        res.status(400).send("unable to update the database");
                    });
            }
        });
    }
}