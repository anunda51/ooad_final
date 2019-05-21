const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema({
    idSubject: String,
    nameSubject: String,
    year: String,
    semester: String,
    date: String,
    time: String,
    room: Array,
    student: Array,
    examiner: Array
}, {
        collection: 'exam'
    });

module.exports = mongoose.model('Exam', Exam);