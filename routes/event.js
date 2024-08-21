const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/middleware");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require("../controllers/events");

router.use(authenticateToken);
// Create an event (POST /api/events)
router.post("/", createEvent);

// Fetch all events (GET /api/events)
router.get("/", getAllEvents);

// Fetch a single event (GET /api/events/:id)
router.get("/:id", getEventById);

// Update an event (PUT /api/events/:id)
router.put("/:id", updateEvent);

// Delete an event (DELETE /api/events/:id)
router.delete("/:id", deleteEvent);

// Register for an event (POST /api/events/:id/register)
router.post("/:id/register", registerForEvent);

module.exports = router;
