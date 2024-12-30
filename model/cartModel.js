const mongoose = require('mongoose')
const { Product } = require('./productModel')

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    }, {timestamps: true}
)

cartSchema.methods.calculateTotalPrice = function() {
    this.totalPrice = this.products.reduce((total, product) => total + (product.price*product.quantity), 0)
}
const Cart = mongoose.model("Cart", cartSchema)

module.exports = {Cart}

