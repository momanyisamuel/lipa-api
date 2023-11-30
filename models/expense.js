let mongoose = require("mongoose");

let expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: Date,
},{timestamps: true});

module.exports = mongoose.model("Expense", expenseSchema);
