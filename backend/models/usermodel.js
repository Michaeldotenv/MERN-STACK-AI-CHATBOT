// models/usermodel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
resetPasswordToken : String,
resetPasswordExpiresAt : Date,

}, { timestamps: true });

// Make sure to create and export the model
const User = mongoose.model('User', userSchema);

export default User