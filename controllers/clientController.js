// import Client from "../models/Client.js";
// import generateMessages from "../utils/messageGenerator.js";
// import sendEmail from "../utils/sendEmail.js";
const Client = require("../models/Client.js");
const generateMessages = require("../utils/messageGenerator.js");
const sendEmail = require("../utils/sendEmail.js");

/**
 * Add client (body must include category and name at minimum)
 */
// export const addClient = async (req, res) => {
exports.addClient = async (req, res) => {
  try {
    const payload = {
      category: req.body.category,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      websiteNeeds: req.body.websiteNeeds || [],
      serviceCost: req.body.serviceCost || 0,
      deadline: req.body.deadline,

      // NEW FIELD
      status: req.body.status || "pending"
    };

    const client = await Client.create(payload);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


/**
 * Get clients with optional category filter:
 * GET /api/clients?category=Gym%20/%20Fitness
 */
// export const getClients = async (req, res) => {
// export const getClients = async (req, res) => {
exports.getClients = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category && category !== "All") filter.category = category;
    if (status && status !== "All") filter.status = status;

    const clients = await Client.find(filter).sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Send generated email to client via nodemailer
 * POST /api/clients/send-email/:id
 */
// export const sendEmailToClient = async (req, res) => {
exports.sendEmailToClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    if (!client.email) return res.status(400).json({ error: "Client email missing" });

    const { email } = generateMessages(client);
    await sendEmail(client.email, "Project Proposal", email);

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**
 * Update client
 * PUT /api/clients/:id
 */
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClient)
      return res.status(404).json({ error: "Client not found" });

    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


/**
 * Delete client
 * DELETE /api/clients/:id
 */
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client)
      return res.status(404).json({ error: "Client not found" });

    res.json({ success: true, message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.reportDashboard = async (req, res) => {
  try {
    const [
      clientsByCategory,
      clientsByStatus,
      revenueByCategory,
      totalRevenue
    ] = await Promise.all([
      // Count clients grouped by category
      Client.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]),

      // Count clients grouped by status
      Client.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),

      // Revenue by category -- ONLY from accepted clients
      Client.aggregate([
        { $match: { status: "accepted" } },
        { $group: { _id: "$category", revenue: { $sum: "$serviceCost" } } }
      ]),

      // Total revenue -- ONLY from accepted clients
      Client.aggregate([
        { $match: { status: "accepted" } },
        { $group: { _id: null, total: { $sum: "$serviceCost" } } }
      ])
    ]);

    res.json({
      clientsByCategory,
      clientsByStatus,
      revenueByCategory,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
