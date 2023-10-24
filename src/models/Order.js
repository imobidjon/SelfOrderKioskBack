const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    number: { type: Number, default: 0 },
    orderType: String,
    payMethod: String,
    isPaid: { type: Boolean, default: false },
    isReady: { type: Boolean, default: false },
    inProgress: { type: Boolean, default: true },
    isCanceled: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    totalPrice: Number,
    orderItems: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
