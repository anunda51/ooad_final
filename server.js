const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRouter');
const subjectRouter = require('./routes/subjectRouter');
const roomRouter = require('./routes/roomRouter');
const yearRouter = require('./routes/yearRouter');
const courseRouter = require('./routes/courseRouter');
const examRouter = require('./routes/examRouter');
const buildingRouter = require('./routes/buildingRouter');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://user:user1234@ds335275.mlab.com:35275/ooad');
mongoose.connect('mongodb+srv://ooad:ooad@cluster-zzyak.mongodb.net/ooad?retryWrites=true');

app.use(express.static('assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/reg', userRouter);
app.use('/reg', subjectRouter);
app.use('/reg', buildingRouter);
app.use('/reg', roomRouter);
app.use('/reg', yearRouter);
app.use('/reg', courseRouter);
app.use('/reg', examRouter);

app.get('/', function (req, res) {
  res.redirect('/reg/login');
});

app.listen(port, function(){
  console.log('start port localhost:'+port);
});