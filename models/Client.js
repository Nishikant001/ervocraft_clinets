// import mongoose from "mongoose";
const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      "Salon / Beauty",
      "Gym / Fitness",
      "Real Estate",
      "Restaurant / Food",
      "Agency / Marketing",
      "Construction",
      "Hotel / Resort",
      "Education / Coaching",
      "E-commerce",
      "Personal Portfolio",
      "Law Firm",
      "Hospital / Clinic",
      "Event Management",
      "Photography",
      "NGO",
      "Automobile",
      "Travel / Tour",
      "IT Services",
      "Repair Services",
      "Interior Designer",
      "Garments / Boutique"
    ],
    required: true
  },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  websiteNeeds: { type: [String], default: [] },
  serviceCost: { type: Number, default: 0 },
  deadline: { type: String },
status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}, { timestamps: true });

// module. mongoose.model("Client", ClientSchema);
module.exports = mongoose.model("Client", ClientSchema);
