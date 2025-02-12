const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  const uri = process.env.MONGODB_URL; // Ensure this is defined
  console.log("MongoDB URI:", uri);
  if (!uri) {
    throw new Error("MongoDB URI is not defined");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Successful");
  } catch (error) {
    console.error("DB Connection Issues:");
    console.error(error);
    throw error; // Rethrow the error to handle it upstream if needed
  }
};
