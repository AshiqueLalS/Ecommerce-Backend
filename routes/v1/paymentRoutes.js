const { checkOut, orderFetch, sessionStatus, orderFetchSeller } = require("../../controllers/orderController");
const { sellerAuth } = require("../../middlewares/sellerAuth");
const { userAuth } = require("../../middlewares/userAuth");


const client_domain = process.env.CLIENT_DOMAIN;

const paymentRouter = require("express").Router();

paymentRouter.post("/create-checkout-session", userAuth, checkOut);

paymentRouter.get("/session-status",userAuth, sessionStatus)

paymentRouter.get("/orderFetch",userAuth,orderFetch)

paymentRouter.get("/seller-orderFetch",sellerAuth,orderFetchSeller)






module.exports = paymentRouter;
