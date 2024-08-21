const mongoose = require("mongoose");
require("dotenv").config(); // Import dotenv to load environment variables

const connect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI); // Use the environment variable
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

connect();
