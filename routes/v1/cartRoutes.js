const { getCart, addToCart, removeProductCart, clearCart } = require("../../controllers/cartControllers")
const { userAuth } = require("../../middlewares/userAuth")

const cartRouter = require("express").Router()

cartRouter.get("/get-cart-details", userAuth, getCart)
cartRouter.post("/add-to-cart", userAuth, addToCart)

cartRouter.delete("/remove-product-cart", userAuth, removeProductCart )
cartRouter.delete("/clear-cart", userAuth, clearCart)



module.exports = cartRouter