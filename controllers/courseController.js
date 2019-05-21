const Course = require('../models/course');
const Subject = require('../models/subject');
const User = require('../models/user');
const Year = require('../models/year');

module.exports = {
    infoCourse: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                Course.find({ year: year.year }, function (err, courses) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageCourse/manageCourse', { err: false, courses: courses, year: year });
                        } else {
                            res.render('staff/manageCourse/manageCourse', { err: true, courses: courses });
                        }
                    }
                });
            } else {
                Course.find(function (err, courses) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageCourse/manageCourse', { err: false, courses: courses, year: year });
                        } else {
                            res.render('staff/manageCourse/manageCourse', { err: true, courses: courses });
                        }
                    }
                });
            }
        });
    },
    addCourse: (req, res) => {
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                if (year) {
                    res.render('staff/manageCourse/addCourse', { err: true, year: year, error: false });
                } else {
                    res.redirect('manageCourse');
                    // res.render('addCourse', { err: false, error: true });
                }
            }
        })
    },
    search: (req, res) => {
        const idSubjectSearch = req.body.idSubjectSearch;
        Subject.findOne({ idSubject: idSubjectSearch }, function (err, subject) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (subject) {
                        res.render('staff/manageCourse/addCourse', { subject: subject, err: false, year: year, error: false });
                    } else {
                        res.render('staff/manageCourse/addCourse', { err: true, year: year, error: true });
                    }
                }
            });
        });
    },
    add: (req, res) => {
        User.find({ selectType: 'นิสิต' }, function (err, student) {
            if (err) {
                console.log(err)
            } else {
                if (!student) {
                    const course = new Course(req.body);
                    Course.findOne({ idSubject: course.idSubject }, function (err, check) {
                        if (check) {
                            res.redirect("/reg/addCourse");
                        } else {
                            if (course.idSubject === "-" || course.nameSubject === "-" || course.credit === "-") {
                                res.redirect("addCourse");
                            } else {
                                course
                                    .save()
                                    .then(course => {
                                        res.redirect("manageCourse");
                                    })
                                    .catch(err => {
                                        res.status(400).send("unable to save to database");
                                    });
                            }
                        }
                    });
                } else {
                    const course = new Course(req.body);
                    Course.findOne({ idSubject: course.idSubject }, function (err, check) {
                        if (check) {
                            res.redirect("/reg/addCourse");
                        } else {
                            if (course.idSubject === "-" || course.nameSubject === "-" || course.credit === "-") {
                                res.redirect("addCourse");
                            } else {
                                course
                                    .save()
                                    .then(course => {
                                        res.redirect("manageCourse");
                                    })
                                    .catch(err => {
                                        res.status(400).send("unable to save to database");
                                    });
                            }
                        }
                    });
                }
            }
        });
    },
    listTeacher: (req, res) => {
        Course.findById({ _id: req.params.id }, function (err, course) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageCourse/courseListTeacher', { course: course, err: false, year: year });
                    } else {
                        res.render('staff/manageCourse/courseListTeacher', { course: course, err: true });
                    }
                }
            });
        });
    },
    addTeacher: (req, res) => {
        User.find({ selectType: 'อาจารย์' }, function (err, teacher) {
            Course.findById({ _id: req.params.id }, function (err, course) {
                Year.findOne(function (err, year) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageCourse/courseAddTeacher', { course: course, err: false, year: year, teacher: teacher });
                        } else {
                            res.render('staff/manageCourse/courseAddTeacher', { course: course, err: true, teacher: teacher });
                        }
                    }
                });
            });
        });

    },
    chooseTeacher: (req, res) => {
        User.findById({ _id: req.params.idTeacher }, function (err, teacher) {
            var flag = false;
            var obj = {
                idUser: teacher.idUser,
                firstname: teacher.firstname,
                lastname: teacher.lastname
            }
            Course.findById({ _id: req.params.id }, function (err, check) {
                for (var i = 0; i < check.teacher.length; i++) {
                    if (check.teacher[i].idUser === obj.idUser) {
                        flag = true
                        break
                    }
                }
                if (flag) {
                    res.redirect(`/reg/addTeacher/${req.params.id}`)
                } else {
                    Course.findByIdAndUpdate({ _id: req.params.id }, { $push: { teacher: obj } }, function (err, course) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect(`/reg/listTeacher/${req.params.id}`)
                        }
                    });
                }
            });
        });
    },
    listStudent: (req, res) => {
        Course.findById({ _id: req.params.id }, function (err, course) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageCourse/courseListStudent', { course: course, err: false, year: year });
                    } else {
                        res.render('staff/manageCourse/courseListStudent', { course: course, err: true });
                    }
                }
            });
        });
    },
    addStudent: (req, res) => {
        Course.findById({ _id: req.params.id }, function (err, course) {
            Year.findOne(function (err, year) {
                console.log(course.student.length);
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageCourse/courseAddStudent', { course: course, err: false, year: year });
                    } else {
                        res.render('staff/manageCourse/courseAddStudent', { course: course, err: true });
                    }
                }
            });
        });
    },
    insertStudent: (req, res) => {
        var obj = {
            idUser: req.body.idUser,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            selectType: 'นิสิต'
        }

        const user = new User(obj);
        User.findOne({ idUser: user.idUser }, function (err, check) {
            if (check) {
                res.redirect(`/reg/addStudent/${req.params.id}`)
            } else {
                user.save()
                Course.findByIdAndUpdate({ _id: req.params.id }, { $push: { student: obj } }, function (err, course) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/reg/listStudent/${req.params.id}`)
                    }
                });
            }
        });
    },
    autoAddStudent: (req, res) => {
        User.find({ selectType: 'นิสิต' }, function (err, student) {
            if (err) {
                console.log(err)
            } else {
                if (!student) {
                    res.redirect(`/reg/addStudent/${req.params.id}`)
                } else {
                    Course.findById({ _id: req.params.id }, function (err, course) {
                        var obj = [];
                        if (course.student.length == 0) {
                            for (var i = 0; i < student.length; i++) {
                                obj[i] = {
                                    idUser: student[i].idUser,
                                    firstname: student[i].firstname,
                                    lastname: student[i].lastname
                                }
                                Course.findByIdAndUpdate({ _id: req.params.id }, { $push: { student: obj[i] } }, function (err, course) { });
                            }
                            res.redirect(`/reg/listStudent/${req.params.id}`)
                        } else {
                            for (var i = 0; i < course.student.length; i++) {
                                Course.findByIdAndUpdate({ _id: req.params.id }, { $pull: { student: { idUser: course.student[i].idUser } } }, function (err, course) { });
                            }
                            res.redirect(`/reg/autoAddStudent/${req.params.id}`)
                        }
                    });
                }

            }
        });
    }
}