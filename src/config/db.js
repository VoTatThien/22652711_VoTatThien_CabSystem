require('dotenv').config();
const mongoose = require('mongoose');

/**
 * Kết nối đến MongoDB với cơ chế retry
 */
const connectDB = async () => {
  const MAX_RETRIES = 5;
  let retries = 0;
  const mongoUri = process.env.MONGODB_URI || 'mongodb://root:cabsystem2026@localhost:27017/cab_system?authSource=admin';

  while (retries < MAX_RETRIES) {
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      retries += 1;
      console.error(`Error connecting to MongoDB (Attempt ${retries}/${MAX_RETRIES}):`, error.message);
      
      if (retries === MAX_RETRIES) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      
      // Đợi 5 giây trước khi thử lại
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = connectDB;
