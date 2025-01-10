const { checkOut, orderFetch, sessionStatus } = require("../../controllers/orderController");
const { userAuth } = require("../../middlewares/userAuth");


const client_domain = process.env.CLIENT_DOMAIN;

const paymentRouter = require("express").Router();

paymentRouter.post("/create-checkout-session", userAuth, checkOut);

paymentRouter.get("/session-status",userAuth, sessionStatus)

paymentRouter.get("/orderFetch",userAuth,orderFetch)

module.exports = paymentRouter;
