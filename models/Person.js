//here we will create database schema for the person 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

personSchema.pre('save',async function(next){
    const person = this;
    //hash the password only if it has been modiffied (or is new)
    if(!person.isModified('password')) return next();

    try {
        //hash password generate
        const salt = await bcrypt.genSalt(10) //higher the number it take more time but secure
        //gensalt is only responsible to generate salt
        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        //hashedPassword contains both hashpass + salt 
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        //use bcrypt to compare the provided password with hashed password
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch; 
    } catch (error) {
        throw error;
    }
}

//create person model
const person = mongoose.model('Person',personSchema);
module.exports = person;

//ipiyush --> adaduadadlkssdjfs
//login --> isomthing (worng password)

//comapre method what does is it extract salt from hased password
//adaduadadlkssdjfs --> extract salt 

// salt+isomething --> hashed --> sdfsdsgosnfsfh 

//and this hash is been compared 