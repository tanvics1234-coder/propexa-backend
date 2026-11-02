const mongoose = require("mongoose");
const options = require("./options");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, trim: true },
  },
  options
);

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    type: { type: String, trim: true },
    beds: { type: Number },
    area: { type: String, trim: true },
    status: { type: String, enum: ["Available", "Pending", "Sold"], default: "Available" },
    image: { type: String, trim: true },
    reviews: { type: [reviewSchema], default: [] },
  },
  options
);

module.exports = mongoose.model("Property", propertySchema);