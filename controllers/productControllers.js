const { Product } = require("../model/productModel")

const productList = async (req, res) =>{
    try {
        const prodList = await Product.find().select("title price image")

        res.status(200).json({message: "Product list Fetched", data: prodList})
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const productDetails = async (req, res)=>{
    try {
        const {productId} = req.params

        const productDetails = await Product.findById(productId).populate("seller")

        res.status(200).json({message: "Product Details Fetched", data: productDetails})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}



module.exports = {productList, productDetails}