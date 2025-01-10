const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
        type: String,
        enum: ["processing","transit","out-for-delevery","delevered"]
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
