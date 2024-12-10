const { productList, productDetails } = require("../../controllers/productControllers")

const productRouter = require("express").Router()


productRouter.get("/products", productList )
productRouter.get("/productDetails", productDetails)

productRouter.post("/add-product", )



module.exports = productRouter