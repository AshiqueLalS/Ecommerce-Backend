const { updateOrderStatus } = require("../../controllers/orderController");
const { sellerAuth } = require("../../middlewares/sellerAuth");
const { userAuth } = require("../../middlewares/userAuth");

const orderRouter = require("express").Router();

orderRouter.patch("/order-status/:orderId", sellerAuth, updateOrderStatus);

module.exports = orderRouter;
