const mongoose = require("mongoose");
const User = require("./user"); // Import the User model (adjust the path based on your project structure)

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String, // You can store time as a string or use a Date object if you want to combine date and time
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store image URL or path
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Array of users who registered for the event
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
