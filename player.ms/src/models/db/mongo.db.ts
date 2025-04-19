import mongoose from "mongoose";

export async function connectMongoDB(): Promise<mongoose.Connection> {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://admin:password@mongo:27017/whalo-players?authSource=admin",
      { maxPoolSize: 10 }
    );
    console.log("MongoDB connected successfully.");
    return mongoose.connection;
  } catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}