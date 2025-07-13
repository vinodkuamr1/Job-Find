import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String, required: true, default: '' },
  location: { type: String, required: true },
  website: { type: String },
  description: { type: String },
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;
