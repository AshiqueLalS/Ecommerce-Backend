const { productList, productDetails, createProduct } = require("../../controllers/productControllers")
const { upload } = require("../../middlewares/multer")
const { sellerAuth } = require("../../middlewares/sellerAuth")
const { userAuth } = require("../../middlewares/userAuth")

const productRouter = require("express").Router()


productRouter.get("/allProducts", productList )
productRouter.get("/productDetails/:productId", productDetails)

productRouter.post("/createProduct", userAuth,upload.single("image"),  createProduct)



module.exports = productRouter