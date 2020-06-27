require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');


const { DB_URL, PORT, NODE_ENV } = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {useNewUrlParser: true});

const db = mongoose.connection; // Connecting to DATABASE...
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db connected');
});

const app = express();
const isProduction = NODE_ENV === 'production';


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors()) // Use this after the variable declaration

app.use(cookieParser()) // cookie parser..

// Initiallize Passport...
app.use(passport.initialize());


// serving static files...
app.use('/uploads', express.static('uploads'));
if (isProduction) app.use(express.static('build'));


// import your route
require('./route/api')(app);


//serving all js data
if (isProduction) {
	app.get('/*', function(req, res) {
	  res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
	    if (err) {
	      res.status(500).send(err)
	    }
	  })
	});
}


const listener = app.listen(PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
