const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
  },
  eventDescription: {
    type: String,
  },
  eventVenue: {
    type: String,
  },
  eventTime: {
    type: String,
  },
  Agegroup: {
    type: String,
  },
  status: {
    type: String,
  },
  admin: {
    type: String,
  },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
