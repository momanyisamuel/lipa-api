let mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  name: String,
  buying_price: Number,
  selling_price: Number,
  supplier: String,
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  quantity: {type: Number, default: 0},
  stock: Number,
  img: String,
});

module.exports = mongoose.model("Product", productSchema);
