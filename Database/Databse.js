const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://pandi:Pandi123@project.22dxkx5.mongodb.net/";

    await mongoose.connect(uri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
