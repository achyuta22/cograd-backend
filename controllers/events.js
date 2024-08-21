const Event = require("../models/event"); // Assuming the Event model is in the models folder
const User = require("../models/user"); // Assuming the User model is also in the models folder

// Creating an event (POST /api/events)
const createEvent = async (req, res) => {
  try {
    console.log(req.body);
    // Extract user ID from request object
    const userId = req.user.id; // This is the user ID from the token

    const { name, eventDate, eventTime, description, location,image } = req.body;

    // Create a new event with the user ID
    const newEvent = new Event({
      eventName: name,
      eventDate,
      eventTime,
      description,
      venue: location,
      image,
      addedBy: userId, // Set the addedBy field to the ID from the token
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Fetching all events (GET /api/events)
const getAllEvents = async (req, res) => {
  // console.log("hi");
  try {
    const events = await Event.find(); // Populate addedBy with user name
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Fetching a single event (GET /api/events/:id)
const getEventById = async (req, res) => {
  console.log("hello boys");
  console.log(req.params);
  try {
    const event = await Event.findById(req.params.id).populate(
      "addedBy",
      "name"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Updating an event (PUT /api/events/:id)
const updateEvent = async (req, res) => {
  try {
    const { eventName,eventDate, eventTime, description, image } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {eventName, eventDate, eventTime, description, image },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Deleting an event (DELETE /api/events/:id)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Registering for an event (POST /api/events/:id/register)
const registerForEvent = async (req, res) => {
  // console.log("hi");
  try {
    const eventId = req.params.id;
    const userId = req.user.id; // Extract the userId from the request token

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is already registered
    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already registered for the event" });
    }

    // Use findByIdAndUpdate with $push to add the user to the attendees array without touching other fields
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { attendees: userId } }, // Add userId to attendees array
      { new: true } // Return the updated document
    );

    res
      .status(200)
      .json({ message: "User registered successfully", event: updatedEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const getEventsAddedByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ addedBy: userId });

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this user" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// View all events registered by a specific user (GET /api/users/:userId/events/registered)
const getEventsRegisteredByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ attendees: userId });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No registered events found for this user" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Exporting all the controller functions using module.exports
module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventsAddedByUser,
  getEventsRegisteredByUser,
};
