// Run once:  npm run seed   -> creates the admin user and sample data
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Customer = require("./models/Customer");
const Property = require("./models/Property");
const Lead = require("./models/Lead");
const FollowUp = require("./models/FollowUp");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Promise.all([User, Customer, Property, Lead, FollowUp].map((M) => M.deleteMany()));

  await User.create({
    name: "Admin",
    email: "admin@propexa.com",
    password: await bcrypt.hash("admin123", 10),
  });

  await Customer.insertMany([
    { name: "Rohit Verma", phone: "98765 43210", email: "rohit@mail.com", city: "Lucknow", budget: "₹80L – ₹1.2Cr", looking: "3 BHK Flat" },
    { name: "Anjali Singh", phone: "91234 56780", email: "anjali@mail.com", city: "Kanpur", budget: "₹40L – ₹60L", looking: "2 BHK Flat" },
    { name: "Imran Khan", phone: "99887 76655", email: "imran@mail.com", city: "Lucknow", budget: "₹2Cr+", looking: "Villa" },
  ]);

  const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=60`;
  await Property.insertMany([
    { title: "Gomti Heights 3BHK", location: "Gomti Nagar, Lucknow", price: "₹1.05 Cr", type: "Flat", beds: 3, area: "1450 sq ft", status: "Available", image: u("photo-1545324418-cc1a3fa10c00"),
      reviews: [{ user: "Rohit V.", rating: 5, text: "Spacious rooms and great society." }, { user: "Neha S.", rating: 4, text: "Good location, parking is tight." }] },
    { title: "Sunrise Residency 2BHK", location: "Alambagh, Lucknow", price: "₹52 L", type: "Flat", beds: 2, area: "980 sq ft", status: "Pending", image: u("photo-1560448204-e02f11c3d0e2"),
      reviews: [{ user: "Anjali S.", rating: 4, text: "Good value for money." }] },
    { title: "Green Valley Villa", location: "Sushant Golf City, Lucknow", price: "₹2.4 Cr", type: "Villa", beds: 4, area: "3200 sq ft", status: "Available", image: u("photo-1613490493576-7fde63acd811"),
      reviews: [{ user: "Imran K.", rating: 5, text: "Beautiful garden and very private." }, { user: "Sana A.", rating: 5, text: "Premium finish throughout." }] },
  ]);

  await Lead.insertMany([
    { customer: "Rohit Verma", property: "Gomti Heights 3BHK", source: "Website", status: "Hot", date: "2026-10-20" },
    { customer: "Anjali Singh", property: "Sunrise Residency 2BHK", source: "Referral", status: "Warm", date: "2026-10-22" },
    { customer: "Imran Khan", property: "Green Valley Villa", source: "Walk-in", status: "Cold", date: "2026-10-25" },
  ]);

  await FollowUp.insertMany([
    { customer: "Rohit Verma", note: "Schedule site visit", date: "2026-10-30", status: "Pending" },
    { customer: "Anjali Singh", note: "Send loan details", date: "2026-10-29", status: "Pending" },
    { customer: "Imran Khan", note: "Call after price revision", date: "2026-10-26", status: "Done" },
  ]);

  console.log("Seed complete. Login: admin@propexa.com / admin123");
  process.exit(0);
})();