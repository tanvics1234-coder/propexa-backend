const mongoose = require("mongoose");
const options = require("./options");

const leadSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true, trim: true },
    property: { type: String, required: true, trim: true },
    source: { type: String, trim: true },
    status: { type: String, enum: ["Hot", "Warm", "Cold", "Converted"], default: "Warm" },
    date: { type: String },
  },
  options
);

module.exports = mongoose.model("Lead", leadSchema);