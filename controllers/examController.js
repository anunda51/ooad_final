const Course = require('../models/course');
const Year = require('../models/year');
const Exam = require('../models/exam');
const Room = require('../models/room');
const User = require('../models/user');

module.exports = {
    infoExam: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                Exam.find({ year: year.year }, function (err, exam) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageExam/manageExamMain', { err: false, exam: exam, year: year });
                        } else {
                            res.render('staff/manageExam/manageExamMain', { err: true, exam: exam });
                        }
                    }
                });
            } else {
                Exam.find(function (err, exam) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageExam/manageExamMain', { err: false, exam: exam, year: year });
                        } else {
                            res.render('staff/manageExam/manageExamMain', { err: true, exam: exam });
                        }
                    }
                });
            }
        });
    },
    createExam: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                Course.find({ year: year.year }, function (err, courses) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageExam/createExam', { err: false, courses: courses, year: year });
                        } else {
                            res.render('staff/manageExam/createExam', { err: true, courses: courses });
                        }
                    }
                });
            } else {
                Course.find(function (err, courses) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageExam/createExam', { err: false, courses: courses, year: year });
                        } else {
                            res.render('staff/manageExam/createExam', { err: true, courses: courses });
                        }
                    }
                });
            }
        });
    },
    openExam: (req, res) => {
        Course.findByIdAndUpdate({ _id: req.params.id }, { status: 'เปิดสอบแล้ว' }, function (err, course) {
            Year.findOne(function (err, year) {
                const exam = new Exam({
                    idSubject: course.idSubject,
                    nameSubject: course.nameSubject,
                    year: year.year,
                    semester: year.semester
                });

                var obj = []
                for (var i = 0; i < course.student.length; i++) {
                    obj[i] = {
                        idUser: course.student[i].idUser,
                        firstname: course.student[i].firstname,
                        lastname: course.student[i].lastname,
                        uSeat: 'ไม่มีที่นั่งสอบ'
                    }

                    exam.student[i] = obj[i]
                }
                exam
                    .save()
                    .then(exam => {
                        res.redirect('/reg/manageExamMain');
                    })
            });
        });
    },
    infoTime: (req, res) => {
        Exam.findById({ _id: req.params.id }, function (err, exam) {
            console.log(exam);
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageExam/manageExamTime', { exam: exam, err: false, year: year });
                    } else {
                        res.render('staff/manageExam/manageExamTime', { exam: exam, err: true });
                    }
                }
            });
        });
    },
    examAddTime: (req, res) => {
        Exam.findById({ _id: req.params.id }, function (err, exam) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageExam/examAddTime', { exam: exam, err: false, year: year });
                    } else {
                        res.render('staff/manageExam/examAddTime', { exam: exam, err: true });
                    }
                }
            });
        });
    },
    addTime: (req, res) => {
        Exam.findByIdAndUpdate({ _id: req.params.id }, { date: req.body.date, time: req.body.timeStart + " - " + req.body.timeOver }, function (err, exam) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err);
                } else {
                    if (year) {
                        res.redirect(`/reg/manageExamTime/${req.params.id}`)
                    } else {
                        res.render('staff/manageExam/examAddTime', { exam: exam, err: true });
                    }
                }
            });
        });
    },
    deleteTime: (req, res) => {
        Exam.findByIdAndUpdate({ _id: req.params.id }, { date: null, time: null }, function (err, exam) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err);
                } else {
                    if (year) {
                        res.redirect(`/reg/manageExamTime/${req.params.id}`)
                    } else {
                        res.render('staff/manageExam/manageExamTime', { exam: exam, err: true });
                    }
                }
            });
        });
    },
    infoRoom: (req, res) => {
        Exam.findById({ _id: req.params.id }, function (err, exam) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err);
                } else {
                    if (year) {
                        res.render('staff/manageExam/examRoom', { exam: exam, err: false, year: year });
                    } else {
                        res.render('staff/manageExam/examRoom', { exam: exam, err: true });
                    }
                }
            });
        });
    },
    examAddRoom: (req, res) => {
        Exam.findById({ _id: req.params.id }, function (err, exam) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err);
                } else {
                    Room.find(function (err, rooms) {
                        if (year) {
                            res.render('staff/manageExam/examAddRoom', { exam: exam, err: false, year: year, rooms: rooms });
                        } else {
                            res.render('staff/manageExam/examAddRoom', { exam: exam, err: true, count: count });
                        }
                    });
                }
            });
        });
    },
    addRoomExam: (req, res) => {
        const id = req.params.id;
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                Room.findByIdAndUpdate({ _id: req.params.idRoom }, { status: 'กำลังใช้สอบ' }, function (err, roomExam) {
                    // console.log(roomExam);
                    var obj = {
                        idRoom: roomExam.idRoom,
                        seat: roomExam.seat,
                        row: roomExam.row,
                        column: roomExam.column,
                    }
                    console.log(obj);
                    Exam.findByIdAndUpdate({ _id: id }, { $push: { room: obj } }, function (err, exam) {
                        res.redirect(`/reg/examRoom/${id}`)
                    });
                });
            }
        });
    },
    infoExaminer: (req, res) => {
        const count_room = req.params.i_room;
        Exam.findById({ _id: req.params.id }, function (err, exam) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageExam/manageExamExaminer', { exam: exam, err: false, year: year, count_room: count_room });
                    } else {
                        res.render('staff/manageExam/manageExamExaminer', { exam: exam, err: true, count_room: count_room });
                    }
                }
            });
        });
    },
    examAddExaminer: (req, res) => {
        const count_room = req.params.i_room;
        Exam.findById({ _id: req.params.id }, function (err, exam) {
            Year.findOne(function (err, year) {
                User.find({}, function (err, users) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (year) {
                            res.render('staff/manageExam/examAddExaminer', { exam: exam, err: false, year: year, count_room: count_room, users: users });
                        } else {
                            res.render('staff/manageExam/examAddExaminer', { exam: exam, err: true, count_room: count_room, users: users });
                        }
                    }
                });
            });
        });
    },
    addExaminer: (req, res) => {
        const user_id = req.params.user_id;
        const id = req.params.id;
        const idRoom = req.params.idRoom;
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                User.findById({ _id: user_id }, function (err, user) {
                    var flag = false;
                    var obj = {
                        idUser: user.idUser,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        idRoom: idRoom
                    }
                    Exam.findById({ _id: id }, function (err, check) {
                        for (var i = 0; i < check.examiner.length; i++) {
                            if (check.examiner[i].idUser === obj.idUser) {
                                flag = true;
                                break;
                            }
                        }

                        if (flag) {
                            res.redirect(`/reg/examAddExaminer/${id}/${req.params.i_room}`)
                        } else {
                            Exam.findByIdAndUpdate({ _id: id }, { $push: { examiner: obj } }, function (err, exam) {
                                res.redirect(`/reg/manageExamExaminer/${id}/${req.params.i_room}`)
                            });
                        }
                    });
                });
            }
        });
    },
    deleteExaminer: (req, res) => {
        const id = req.params.id;
        const idUser = req.params.idUser;
        const count_room = req.params.i_room;
        Exam.findByIdAndUpdate({ _id: id }, { $pull: { examiner: { idUser: idUser } } }, function (err, exam) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err);
                } else {
                    if (year) {
                        res.redirect(`/reg/manageExamExaminer/${id}/${count_room}`)
                    } else {
                        res.render('staff/manageExam/manageExamExaminer', { exam: exam, err: true, count_date: count_date, count_room: count_room });
                    }
                }
            });
        });
    },
    infoStudent: (req, res) => {
        const id = req.params.id;
        const count_room = req.params.i_room;

        Exam.findById({ _id: id }, function (err, exam) {
            var seatNo = 0;
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < exam.student.length; i++) {
                    if (exam.student[i].uSeat != 'ไม่มีที่นั่งสอบ' && exam.student[i].room === exam.room[count_room].idRoom) {
                        seatNo++;
                    }
                }
                Year.findOne(function (err, year) {
                    if (year) {
                        res.render('staff/manageExam/manageExamSeat', { exam: exam, year: year, count_room: count_room, err: false, seatNo: seatNo })
                    } else {
                        res.render('staff/manageExam/manageExamSeat', { exam: exam, count_room: count_room, err: true, seatNo: seatNo })
                    }
                });
            }
        });
    },
    autoFillSeat: (req, res) => {
        const id = req.params.id;
        const count_room = req.params.i_room;
        Exam.findById({ _id: id }, function (err, exam) {
            var obj = []
            var position = 0;
            var column = 0;
            var colName = [];

            if (exam.room[count_room].column == 4) {
                colName = ['A', 'B', 'C', 'D']
            } else if (exam.room[count_room].column == 5) {
                colName = ['A', 'B', 'C', 'D', 'E']
            } else if (exam.room[count_room].column == 6) {
                colName = ['A', 'B', 'C', 'D', 'E', 'F']
            }

            for (var i = 0; i < exam.student.length; i++) {
                if (exam.student[i].uSeat === 'ไม่มีที่นั่งสอบ') {
                    if (position >= exam.room[count_room].row) {
                        position = 1;
                        column++;
                    } else {
                        position++;
                    }
                    obj[i] = {
                        idUser: exam.student[i].idUser,
                        firstname: exam.student[i].firstname,
                        lastname: exam.student[i].lastname,
                        room: exam.room[count_room].idRoom,
                        uSeat: 'ห้องสอบ : ' + exam.room[count_room].idRoom + ' ที่นั่งสอบ : ' + colName[column] + position
                    }
                    Exam.findByIdAndUpdate({ _id: id }, { $push: { student: obj[i] } }, function (err, exam) { })
                    Exam.findByIdAndUpdate({ _id: id }, { $pull: { student: { uSeat: 'ไม่มีที่นั่งสอบ' } } }, function (err, exam) { })
                }
                console.log(position);
            }
            res.redirect(`/reg/manageExamSeat/${id}/${count_room}`)
        });
    },
    cancelRoom: (req, res) => {
        const id = req.params.id;
        const idRoom = req.params.idRoom;
        Room.findOneAndUpdate({ idRoom: idRoom }, { status: null }, function (err, roomExam) { });
        Exam.findByIdAndUpdate({ _id: id }, { $pull: { room: { idRoom: idRoom } } }, function (err, exam) { });
        Exam.findByIdAndUpdate({ _id: id }, { $pull: { examiner: { idRoom: idRoom } } }, function (err, exam) { })
        Exam.findById({ _id: id }, function (err, exam) {
            var obj = []
            if (exam.student.length == 0) {
                Course.findOne({ idSubject: exam.idSubject, year: exam.year }, function (err, course) {
                    for (var i = 0; i < course.student.length; i++) {
                        obj[i] = {
                            idUser: course.student[i].idUser,
                            firstname: course.student[i].firstname,
                            lastname: course.student[i].lastname,
                            room: null,
                            uSeat: 'ไม่มีที่นั่งสอบ'
                        }
                        Exam.findByIdAndUpdate({ _id: id }, { $push: { student: obj[i] } }, function (err, exam) { })
                    }
                });
                res.redirect(`/reg/examRoom/${id}`)
            } else {
                for (var i = 0; i < exam.student.length; i++) {
                    Exam.findByIdAndUpdate({ _id: id }, { $pull: { student: { idUser: exam.student[i].idUser } } }, function (err, exam) { })
                }
                res.redirect(`/reg/cancelRoom/${id}/${req.params.i_room}/${idRoom}`)
            }
        });
    },
    infoExammination: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                User.findById({ _id: req.params.id }, function (err, user) {
                    Exam.find({ year: year.year }, function (err, exam) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.render('student/exam/examList', { err: false, exam: exam, year: year, user: user });
                        }
                    });
                });
            }
        });
    },
    infoExaminerTeacherList: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                User.findById({ _id: req.params.id }, function (err, user) {
                    Exam.find({ year: year.year }, function (err, exam) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.render('teacher/exam/examinerList', { err: false, exam: exam, year: year, user: user });
                        }
                    });
                });
            }
        });
    },
    infoExaminerOfficerList: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                User.findById({ _id: req.params.id }, function (err, user) {
                    Exam.find({ year: year.year }, function (err, exam) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.render('officer/exam/examinerOfficerList', { err: false, exam: exam, year: year, user: user });
                        }
                    });
                });
            }
        });
    }
}