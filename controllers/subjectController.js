const Subject = require('../models/subject');
const Year = require('../models/year');

module.exports = {
    infoSubject: (req, res) => {
        Subject.find(function (err, subjects) {
            Year.findOne(function (err, year) {
                if (err) {
                    console.log(err)
                } else {
                    if (year) {
                        res.render('staff/manageSubject/manageSubject', { subjects: subjects, year: year, err: false });
                    } else {
                        res.render('staff/manageSubject/manageSubject', { subjects: subjects, err: true });
                    }
                }
            });
        });
    },
    addSubject: (req, res) => {
        Year.findOne(function (err, year) {
            if (year) {
                res.render('staff/manageSubject/addSubject', { err: false, year: year });
            } else {
                res.render('staff/manageSubject/addSubject', { err: true });
            }
        });
    },
    add: (req, res) => {
        const subject = new Subject(req.body);
        console.log(subject);
        Subject.findOne({ idSubject: subject.idSubject }, function (err, check) {
            if (check) {
                res.redirect("/reg/addSubject");
            } else {
                subject
                    .save()
                    .then(subject => {
                        res.redirect("manageSubject");
                    })
                    .catch(err => {
                        res.status(400).send("unable to save to database");
                    });
            }
        });
    },
    delete: (req, res) => {
        Subject.findByIdAndRemove({ _id: req.params.id }, function (err, coin) {
            if (err) res.json(err);
            else res.redirect("/reg/manageSubject");
        });
    },
    editSubject: (req, res) => {
        const id = req.params.id;
        Subject.findById(id, function (err, subject) {
            Year.findOne(function (err, year) {
                if (year) {
                    res.render("staff/manageSubject/editSubject", { subject: subject, err: false, year: year });
                } else {
                    res.render("staff/manageSubject/editSubject", { subject: subject, err: true });
                }
            });
        });
    },
    update: (req, res) => {
        Subject.findById(req.params.id, function (err, subject) {
            if (!subject) return next(new Error("Could not load Document"));
            else {
                // do your updates here
                subject.idSubject = req.body.idSubject;
                subject.nameSubject = req.body.nameSubject; // รับค่าจากหน้า ฟอร์ม
                subject.credit = req.body.credit;

                subject
                    .save()
                    .then(subject => {
                        res.redirect("/reg/manageSubject");
                    })
                    .catch(err => {
                        res.status(400).send("unable to update the database");
                    });
            }
        });
    }
}