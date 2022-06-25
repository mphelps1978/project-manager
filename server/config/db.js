const mongoose = require('mongoose');



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected at'.brightGreen.bold.underline, conn.connection.host.brightBlue.bold.underline);
  } catch (err) {
    console.error(err.message.red.bold);
    process.exit(1);
  }
}

module.exports = connectDB;