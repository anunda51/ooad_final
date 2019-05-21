const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Building = new Schema({
    idBuilding: {
        type: String
    },
    name: {
        type: String
    },
    floor: {
        type: String
    }
}, {
        collection: 'building'
    });

module.exports = mongoose.model('Building', Building);