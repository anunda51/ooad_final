const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Year = new Schema({
    year: {
        type: String
    },
    semester: {
        type: String
    }
}, {
        collection: 'year'
    });

module.exports = mongoose.model('Year', Year);