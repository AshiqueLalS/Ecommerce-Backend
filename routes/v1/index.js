const cartRouter = require('./cartRoutes')
const paymentRouter = require('./paymentRoutes')
const productRouter = require('./productRoutes')
const reviewRouter = require('./reviewRoutes')
const sellerRouter = require('./sellerRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/seller", sellerRouter)
v1Router.use("/product", productRouter)
v1Router.use("/carts", cartRouter)
v1Router.use("/review", reviewRouter)
v1Router.use("/payment", paymentRouter)

module.exports = v1Router