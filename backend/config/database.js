const mongoose=require("mongoose");
require("dotenv").config();
exports.connect=async ()=> {
    const uri = process.env.MONGODB_URL; // Ensure this is defined
    console.log(uri)
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
    
}

