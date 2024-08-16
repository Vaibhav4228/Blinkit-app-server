import mongoose from "mongoose";

export const connectDB = async(uri)=> {
  try {
    await mongoose.connect(uri)
    console.log("DB connect");
    
  } catch (error) {
    console.log("database connection error....", error)
    
  }
}
