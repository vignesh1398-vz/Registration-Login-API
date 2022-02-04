var mongoose = require('mongoose');
var validator = require('validator');
var panRegex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [3,'Username should be greater than 2 characters '],
        maxlength: [40, 'Username cannot be more than 40 characters']
    },
    pan: {
        type: String,
        validate(p) {
            if(!panRegex.test(p)) {
                throw new Error('Entered pan in invalid');
            }
        }
    },
    fatherName: {
        type: String,
        trim: true,
        minlength: [3,'Username should be greater than 2 characters '],
        maxlength: [40, 'Username cannot be more than 40 characters']
    },
    DOB:{
        type: Date
    },
    mobile: {
        type: String,
        unique: true,
        validate(m) {
            if(!validator.isMobilePhone(m)){
                throw new Error('Mobile number is invalid');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(e) {
            if (!validator.isEmail(e)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String
    },
    activeLogins: {
        type: Number,
        default: 0
    },
    created_date: {
        type: Date,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    }
});

const users = mongoose.model('users', userSchema);
module.exports = users;