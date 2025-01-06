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
    image: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    },
    address:{
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

module.exports = new mongoose.model("users", userSchema)

