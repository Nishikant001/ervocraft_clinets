// routes/clientRoutes.js

const express = require("express");
const {
  addClient,
  getClients,
  sendEmailToClient,
  updateClient,
  deleteClient,
  reportDashboard, // ✅ import the new report controller
} = require("../controllers/clientController.js");

const router = express.Router();

// Client CRUD
router.post("/add", addClient);
router.get("/", getClients);
router.post("/send-email/:id", sendEmailToClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

// Dashboard report
router.get("/report/dashboard", reportDashboard); // ✅ new report endpoint

module.exports = router;
