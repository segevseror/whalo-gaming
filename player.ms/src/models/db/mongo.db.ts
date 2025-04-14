import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/whalo?authSource=admin',
    );
    console.log("MongoDB connected successfully.");
  } catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectMongoDB;
