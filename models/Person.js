//here we will create database schema for the person 
const mongoose = require('mongoose');

//define the person schema
const personSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true,
        enum:['chef','waiter','manager']
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    }
})

//create person model
const person = mongoose.model('Person',personSchema);
module.exports = person;

