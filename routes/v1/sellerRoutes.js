const { sellerRegister, sellerLogin, sellerProfile, sellerLogout, dataFetch } = require('../../controllers/sellerController')
const { sellerAuth } = require('../../middlewares/sellerAuth')

const sellerRouter = require('express').Router()

sellerRouter.post("/signup", sellerRegister)
sellerRouter.post("/login", sellerLogin)

sellerRouter.get("/userFetch",dataFetch)

sellerRouter.get("/seller-profile",sellerAuth, sellerProfile)
sellerRouter.get("/sellerLogout",sellerLogout)
module.exports = sellerRouter