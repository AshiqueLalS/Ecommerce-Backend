const cartRouter = require('./cartRoutes')
const productRouter = require('./productRoutes')
const reviewRouter = require('./reviewRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/product", productRouter)
v1Router.use("/carts", cartRouter)
v1Router.use("/review", reviewRouter)

module.exports = v1Router