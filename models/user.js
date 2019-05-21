const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
   idUser: {
     type: String
},
  password: {
     type: String, default: "password"
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  selectType: {
    type: String
  }
},{
    collection: 'user'
});

module.exports = mongoose.model('User', User);