const mongoose = require("mongoose");
const Schema = mongoose.Schema
const EventSchema = new mongoose.Schema({
  eventId: {
    type: Schema.Types.ObjectId,
  },
  teacherName: {
    type: String,
  },
  teacherEmail: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  studentSize: {
    type: String,
  },
  gender: {
    type: String,
  },
  Agegroup: {
    type: String,
  },
  registrationCode: {
    type: String,
  },
  status:{
    type:String
  }
});

const applyEvent = mongoose.model("applyEvent", EventSchema);

module.exports = applyEvent;
