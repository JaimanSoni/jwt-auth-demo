require("dotenv").config();

const mongoose = require("mongoose");

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to mongoDB");
  } catch (err) {
    console.error("Error in connecting to mongoDB");
    console.log(err);
  }
};
