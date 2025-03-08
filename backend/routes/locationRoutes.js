const express = require("express");
const router = express.Router();
const Location = require("../models/locationModel");

// Save Location Data
router.post("/", async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json({ message: "Location saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
