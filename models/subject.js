const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
   idSubject: {
     type: String
},
  nameSubject: {
     type: String
  },
  credit: {
    type: String
  }
},{
    collection: 'subject'
});

module.exports = mongoose.model('Subject', Subject);