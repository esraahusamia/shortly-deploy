var path = require('path');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/shortlydb';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open',function(){
  console.log('mangoDB connection is open')
})

module.exports = db;
