import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, defualt: false },
  resume: { type: String }
}, { timestamps: true, });

const User = mongoose.model("User", userSchema);
export default User;
