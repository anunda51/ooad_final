const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = "mongodb+srv://ooad:ooad@cluster-zzyak.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true }); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
//Called hooks which runs before something.
beforeEach((done) => {
    mongoose.connection.collections.room.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});
