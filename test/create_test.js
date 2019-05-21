//inside create_test.js
const assert = require('assert');
const Exam = require('../models/exam')
const Room = require('../models/room')
const User = require('../models/user')

describe('Creating documents', () => {
    it('creates a rooms', (done) => {
        const room = new Room({
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
            .then(() => {
                assert(!room.isNew);
                done();
            });
    });
    it('creates a exam', (done) => {
        const exam = new Exam({
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
            .then(() => {
                assert(!exam.isNew);
                done();
            });
    });
});