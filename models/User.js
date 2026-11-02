const mongoose = require("mongoose");
const options = require("./options");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  options
);

module.exports = mongoose.model("User", userSchema);