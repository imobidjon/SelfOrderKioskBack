const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orders", async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.payMethod ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
    return res.send({ message: "Data is required." });
  }

  const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});

router.get("/orders", async (req, res) => {
  const orders = await Order.find({ isDelivered: false, isCanceled: false });
  res.send(orders);
});

router.put("/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.action === "ready") {
      order.isReady = true;
      order.inProgress = false;
    } else if (req.body.action === "deliver") {
      order.isDelivered = true;
    } else if (req.body.action === "cancel") {
      order.isCanceled = true;
    }
    await order.save();
    res.send({ message: "Done" });
  } else {
    req.status(404).message("Order not found");
  }
});

module.exports = router;
