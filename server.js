require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const auth = require("./middleware/auth");
const crudRouter = require("./routes/crud");

const Customer = require("./models/Customer");
const Lead = require("./models/Lead");
const FollowUp = require("./models/FollowUp");

const app = express();
app.use(cors());          // lets the frontend (another port) call this API
app.use(express.json());  // reads JSON request bodies

app.get("/", (req, res) => res.json({ message: "Propexa API is running" }));

app.use("/api/auth", require("./routes/auth"));                // public
app.use("/api/customers", auth, crudRouter(Customer));         // protected
app.use("/api/properties", auth, require("./routes/properties"));
app.use("/api/leads", auth, crudRouter(Lead));
app.use("/api/followups", auth, crudRouter(FollowUp));
app.use("/api/dashboard", auth, require("./routes/dashboard"));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  });