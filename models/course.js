const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    idSubject: {
        type: String
    },
    nameSubject: {
        type: String,
    },
    teacher: {
        type: Array
    },
    student: {
        type: Array
    },
    year: {
        type: String
    },
    semester: {
        type: String
    },
    status: {
        type: String, default: 'ยังไม่เปิดสอบ'
    }
}, {
        collection: 'course'
    });

module.exports = mongoose.model('Course', Course);