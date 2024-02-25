const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
