const mongoose = require("mongoose");
const options = require("./options");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true },
    budget: { type: String, trim: true },
    looking: { type: String, trim: true },
  },
  options
);

module.exports = mongoose.model("Customer", customerSchema);