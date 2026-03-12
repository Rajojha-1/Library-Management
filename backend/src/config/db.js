const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("[DB] Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`[DB] MongoDB connected: ${mongoose.connection.name}`);

    mongoose.connection.on("error", (err) => {
      console.error("[DB] MongoDB runtime error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("[DB] MongoDB disconnected");
    });
  } catch (error) {
    console.error("[DB] MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
