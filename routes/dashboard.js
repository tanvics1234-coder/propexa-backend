const express = require("express");
const Customer = require("../models/Customer");
const Property = require("../models/Property");
const Lead = require("../models/Lead");
const FollowUp = require("../models/FollowUp");

const router = express.Router();

// GET /api/dashboard  -> summary numbers for the Overview page
router.get("/", async (req, res) => {
  const [customers, properties, leads, pendingFollowUps, hotLeads] = await Promise.all([
    Customer.countDocuments(),
    Property.countDocuments(),
    Lead.countDocuments(),
    FollowUp.countDocuments({ status: "Pending" }),
    Lead.countDocuments({ status: "Hot" }),
  ]);
  res.json({ customers, properties, leads, pendingFollowUps, hotLeads });
});

module.exports = router;