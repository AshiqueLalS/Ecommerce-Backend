const { Cart } = require("../model/cartModel");
const { Product } = require("../model/productModel");

const getCart = async (req, res) =>{
    try {
        const userId = req.user.id

        const cart = await Cart.findOne({userId}).populate("products.productId")

        if(!cart){
            return res.status(404).json({message: "Cart not found"})
        }

        res.status(200).json({message: "Cart found successfully", data: cart})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const addToCart = async (req, res) =>{
    try {
        const userId = req.user.id
        const {productId, quantity} = req.body

        if(!productId){
            return res.status(401).json({message: "Product Id not fetched"})
        }
       
        const product = await Product.findById(productId)
        if(!product){
            return res.status(401).json({message: "Product not found"})
        }

        let cart = await Cart.findOne({userId})
        if(!cart){
            cart = new Cart({userId, products: []})
        }

        const existingItemIndex = cart.products.findIndex(products => products.productId.toString() === productId);

        if (existingItemIndex >= 0) {
            
            cart.products[existingItemIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, price: product.price, quantity });
        }

        cart.calculateTotalPrice()
        await cart.save()

        res.status(200).json({ message: "Product added to cart",data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const removeProductCart = async (req, res) =>{
    try {
        const userId = req.user.id
        const {productId} = req.body

        let cart = await Cart.findOne({userId})

        if(!cart){
            return res.status(404).json({message: "Cart not found"})
        }

        cart.products = cart.products.filter((product) => !product.productId.equals(productId))

        cart.calculateTotalPrice()

        await cart.save()

        res.status(200).json({message: "removed cart items successfully", data: cart})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const clearCart = async (req,res) =>{
    try {
        const userId = req.user.id

        const cart = await Cart.findOne({userId})
        cart.products = []

        cart.calculateTotalPrice()
        await cart.save()

        res.status(200).json({message: "Deleted cart items successfully", data: cart})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}


module.exports = { getCart, addToCart, removeProductCart, clearCart}