const mongoose = require("mongoose");
const options = require("./options");

const followUpSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true, trim: true },
    note: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Done"], default: "Pending" },
  },
  options
);

module.exports = mongoose.model("FollowUp", followUpSchema);