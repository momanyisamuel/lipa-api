let mongoose = require("mongoose");

let customerSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
},{timestamps: true});

module.exports = mongoose.model("Customer", customerSchema);