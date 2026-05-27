import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log(`Pomyślnie połączono z bazą ${process.env.MONGO_DB_NAME}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
