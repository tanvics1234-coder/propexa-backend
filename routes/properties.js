const crudRouter = require("./crud");
const Property = require("../models/Property");

const router = crudRouter(Property);

// Extra route: add a review to a property  ->  POST /api/properties/:id/reviews
router.post("/:id/reviews", async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found." });

  property.reviews.push(req.body);
  await property.save();
  res.status(201).json(property);
});

module.exports = router;