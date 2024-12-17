const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { Product } = require("../model/productModel");

const productList = async (req, res) => {
  try {
    const prodList = await Product.find().select("title price image");

    res.status(200).json({ message: "Product list Fetched", data: prodList });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const productDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const productDetails = await Product.findById(productId).populate("seller");

    res
      .status(200)
      .json({ message: "Product Details Fetched", data: productDetails });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    const { id } = req.user;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const productAlreadyExist = await Product.findOne({ title });

    if (productAlreadyExist) {
      return res.status(400).json({ error: "Product already exists" });
    }

    const uploadResult = await cloudinaryInstance.uploader.upload(
      req.file.path
    );

    console.log(uploadResult);

    const newProduct = new Product({
      title,
      description,
      price,
      image: uploadResult.url,
      seller: id,
    });
    await newProduct.save();

    res
      .status(200)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = { productList, productDetails, createProduct };
