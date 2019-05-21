// update_test.js
const assert = require('assert');
const Exam = require('../models/exam')
const Room = require('../models/room')
const User = require('../models/user')
let room;
let exam;
describe('Deleting a room', () => {
    
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

    function assertHelper(statement, done) {
        statement
            .then(() => Room.find({}))
            .then((room) => {
                assert(room.length === 1);
                assert(room[0].idRoom === '7T01');
                done();
            });
    }

    it('sets and saves room using an instance', (done) => {
        room.set('seat', 100); //not updated in mongodb yet
        assertHelper(room.save(), done);
    });

    it('update room using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(room.update({ seat: 100 }), done);
    });

    it('update all matching room using model', (done) => {
        assertHelper(Room.update({ seat: 50 }, { seat: 100 }), done);
    });

    it('update one room using model', (done) => {
        assertHelper(Room.findOneAndUpdate({ idRoom: room.idRoom }, { seat: 100 }), done);
    });

    it('update one room with id using model', (done) => {
        assertHelper(Room.findByIdAndUpdate(room._id, { seat: 100 }), done);
    });
});
describe('Deleting a exam', () => {
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
    function assertHelper(statement, done) {
        statement
            .then(() => Exam.find({}))
            .then((exams) => {
                assert(exams.length >= 1);
                assert(exams[0].idSubject == exam.idSubject);
                done();
            });
    }

    it('sets and saves exam using an instance', (done) => {
        exam.set('semester', '2'); //not updated in mongodb yet
        assertHelper(exam.save(), done);
    });

    it('update room using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(exam.update({ semester: '2' }), done);
    });

    it('update all matching room using model', (done) => {
        assertHelper(exam.update({ semester: '1' }, { semester: '2' }), done);
    });

    it('update one exam using model', (done) => {
        assertHelper(Exam.findOneAndUpdate({ idSubject: "88610159" }, { semester: '2' }), done);
    });
    
    it('update one exam with id using model', (done) => {
        assertHelper(Exam.findByIdAndUpdate(exam._id, { semester: '2' }), done);
    });
});