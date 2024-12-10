const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 30,
    },
    phone: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

module.exports = new mongoose.model("users", userSchema)

