const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ["seller", "admin"],
            default: 'seller'
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        address:{
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        products: [{ type: mongoose.Types.ObjectId, ref: "products"}],
    }, { timestamps: true}
)

module.exports = new mongoose.model("seller", sellerSchema)