//inside read_test.js
const assert = require('assert');
const Exam = require('../models/exam')
const Room = require('../models/room')
const User = require('../models/user')
let room;
let exam;
describe('Reading room details', () => {
    beforeEach((done) => {
        room = new Room({
            idRoom: "7T01",
            seat: 50,
            floor: "7",
            building: "IF",
            type: "lab",
            row: 10,
            column: 5,
            status: null
        });
        room.save()
            .then(() => done());
    });
    it('removes a room using its instance', (done) => {
        room.remove()
            .then(() => Room.findOne({ idRoom: room.idRoom }))
            .then((room) => {
                assert(room === null);
                done();
            });
    });
    it('removes multiple room', (done) => {
        Room.remove({ idRoom: room.idRoom })
            .then(() => Room.findOne({ idRoom: room.idRoom }))
            .then((room) => {
                assert(room === null);
                done();
            });
    });

    it('removes a room', (done) => {
        Room.findOneAndRemove({ idRoom: room.idRoom })
            .then(() => Room.findOne({ idRoom: room.idRoom }))
            .then((room) => {
                assert(room === null);
                done();
            });
    });

    it('removes a room using id', (done) => {
        Room.findByIdAndRemove(room._id)
            // the following code block is repeated again and again
            .then(() => Room.findOne({ idRoom: room.idRoom }))
            .then((room) => {
                assert(room === null);
                done();
            });
    })
})
describe('Delete exam details', () => {
    beforeEach((done) => {
        exam = new Exam({
            idSubject: "88610159",
            nameSubject: "OOAD",
            year: "2561",
            semester: "1",
            date: "2-2-2561",
            time: "8.00 - 10.00",
            room: [new Room],
            student: [new User],
            examiner: []
        })
        exam.save()
            .then(() => done());
    });

    it('removes a exam using its instance', (done) => {
        Exam.remove()
            .then(() => Exam.findOne({ idSubject: "88610159" }))
            .then((exams) => {
                assert(exams === null);
                done();
            });
    });

    it('removes multiple exam', (done) => {
        Exam.remove({ idSubject: "88610159" })
            .then(() => Exam.findOne({ idSubject: "88610159" }))
            .then((exams) => {
                assert(exams === null);
                done();
            });
    });

    it('removes a exam', (done) => {
        Exam.findOneAndRemove({ idSubject: "88610159" })
            .then(() => Exam.findOne({ idSubject: "88610159" }))
            .then((exams) => {
                assert(exams === null);
                done();
            });
    });

    it('removes a exam using id', (done) => {
        Exam.findByIdAndRemove(exam._id)
            // the following code block is repeated again and again
            .then(() => Exam.findOne({ idSubject: "88610159" }))
            .then((exams) => {
                assert(exams === null);
                done();
            });
    })
})