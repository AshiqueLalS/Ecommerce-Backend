const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 30,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 300,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = { Product };
