let mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
  name: String,
},{timestamps: true});

module.exports = mongoose.model("Category", categorySchema);
