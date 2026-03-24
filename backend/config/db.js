import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const options = {
    serverSelectionTimeoutMS: 5000,
    tls: true,
    tlsInsecure: true, // Forces local machine ignores of strict SSL errors
  };

  const attempt = async () => {
    try {
      const conn = await mongoose.connect(uri, options);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`❌ MongoDB Error: ${error.message}`);
      console.log('⏳ Retrying MongoDB connection in 5s...');
      setTimeout(attempt, 5000);
    }
  };

  await attempt();
};

export default connectDB;
