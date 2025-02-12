
const mongoose = require('mongoose');

const connect = async () => {
  const uri = process.env.MONGO_URI; // Ensure this is defined
  if (!uri) {
    throw new Error('MongoDB URI is not defined');
  }
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database connected successfully');
};

module.exports = connect;
