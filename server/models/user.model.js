const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 1024
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel