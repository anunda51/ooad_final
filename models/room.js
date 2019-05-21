const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
    idRoom: {
        type: String
    },
    seat: {
        type: Number
    },
    floor: {
        type: String
    },
    building: {
        type: String
    },
    type: {
        type: String
    },
    row: {
        type: Number
    },
    column: {
        type: Number
    },
    status: {
        type: String, default: null
    },
}, {
        collection: 'room'
    });

module.exports = mongoose.model('Room', Room);