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
    it('finds room with the id of room', (done) => {
        Room.findOne({ idRoom: room.idRoom })
            .then((rooms) => {
                assert(rooms.idRoom == room.idRoom);
                done();
            });
    })
})
describe('Reading exam details', () => {
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
    it('finds exam with the name of exam', (done) => {
        Exam.findOne({ idSubject: "88610159" })
            .then((exams) => {
                assert(exams.idSubject === exam.idSubject);
                done();
            });
    })
})