const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
            maxLength: 300,
        }
    }, {timestamp: true}
)

module.exports = new mongoose.model("reviews", reviewSchema)