const express = require("express");
const router = express.Router();
const Partner = require("../models/partnerModel");

// Save Partner Data
router.post("/", async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json({ message: "Partner details saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Partner Entries
router.get("/", async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
