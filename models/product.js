let mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  quantity: String,
  stock: String,
  img: String,
});

module.exports = mongoose.model("Product", productSchema);
