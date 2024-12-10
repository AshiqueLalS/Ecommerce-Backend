const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        }
    }, {timestamps: true}
)

module.exports = new mongoose.model("carts", cartSchema)