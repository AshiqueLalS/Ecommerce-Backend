const { Product } = require("../model/productModel");
const { Order } = require("../model/orderModel");

const stripe = require("stripe")(process.env.Stripe_Private_Api_Key);

const client_domain = process.env.CLIENT_DOMAIN;

const checkOut = async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((products) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: products?.productId?.title,
          images: [products?.productId?.image],
        },
        unit_amount: Math.round(products?.productId?.price * 100),
      },
      quantity: products?.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${client_domain}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${client_domain}/user/payment/cancel`,
    });
    console.log({ userId: req.user.id });

    const order = new Order({
      userId: req.user.id,
      sessionId: session.id,
      products: products,
      totalPrice: products.reduce(
        (acc, current) => (acc += current.quantity * current?.price),
        0
      ),
      orderStatus: "processing",
    });

    await order.save();

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const orderFetch = async (req, res) => {
  try {
    const orderData = await Order.find({ userId: req.user.id });

    res.status(200).json({ message: "Fetched Order details", data: orderData });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const orderFetchSeller = async (req, res) => {
  try {
    const sellerOrderData = await Order.find({ productId: req?.products?.id });
    console.log({ sellerOrderData });

    res
      .status(200)
      .json({ message: "Fetched all Order details", data: sellerOrderData });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const sessionStatus = async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);
    const orderId = await Order.findOne({ sessionId: session.id });
    console.log({ orderId });

    res.send({
      data: {
        status: session?.status,
        customer_email: session?.customer_details?.email,
        session_data: session,
        orderId: orderId,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.orderStatus;
  console.log({ orderId, newStatus });
  try {
    const order = await Order.findById(orderId);
    order.orderStatus = newStatus;
    await order.save();
    res.status(201).json({
      success: true,
      messsage: "Order status updated",
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = {
  checkOut,
  orderFetch,
  sessionStatus,
  orderFetchSeller,
  updateOrderStatus,
};
