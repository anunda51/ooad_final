const Year = require("../models/year");

module.exports = {
    infoYear: (req, res) => {
        Year.findOne(function (err, year) {
            if (err) {
                console.log(err);
            } else {
                if (year) {
                    res.render('staff/manageYear/manageYear', { year: year, err: false });
                } else {
                    res.render('staff/manageYear/manageYear', { err: true });
                }
            }
        })
    },
    update: (req, res) => {
        Year.findOneAndUpdate({}, { year: req.body.year, semester: req.body.semester }, function (err, year) {
            if (err) {
                console.log(err);
            } else {
                if (year) {
                    res.redirect('/reg/manageYear')
                } else {
                    res.render('staff/manageYear/manageYear', { err: true });
                }
            }
        })
    }
}