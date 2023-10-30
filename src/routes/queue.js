const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/orders/queue", async (req, res) => {
  const inProgressOrders = await Order.find(
    { inProgress: true, isCanceled: false },
    "number"
  );
  const servingOrders = await Order.find(
    { isReady: true, isDelivered: false },
    "number"
  );
  res.send({ inProgressOrders, servingOrders });
});

module.exports = router;