// file for setting up the database conncetion using mongoose
const mongoose = require('mongoose');
const { on } = require('nodemon');

//get the url of mongodb server for making connection 
const mongoUrl = 'mongodb://127.0.0.1:27017/hotels'; //

//set up mongodb connection 
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
      useUnifiedTopology: true
})

//get the default connection 
//mongoes maintains default conncetion objects repre the mongodb conncetion 
const db = mongoose.connection; //this db acts as brodge between mongo and node

//define event listners for dataabase conncetion 
db.on('connected',()=>{
    console.log('connceted to mongodb server');
})

db.on('error',()=>{
    console.log('mongo connection error');
})

db.on('disconnected',()=>{
    console.log('server disconnected');
})

//export the database conncetion
module.exports = db;



