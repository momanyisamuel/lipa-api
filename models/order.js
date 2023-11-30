let mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  ref_number: String,
  discount: Number,
  customer: String,
  subtotal: Number,
  tax: String,
  items: Array,
  date: Date,
  payment_type: String,
  payment_info: String,
  total: Number,
  paid: String,
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},{timestamps: true});

module.exports = mongoose.model("Order", orderSchema);
