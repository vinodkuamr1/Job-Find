import mongoose from 'mongoose';

const applySchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String },
  website: { type: String },
  expectedSalary: { type: String },
  coverLetter: { type: String },
  resumeUrl: { type: String, required: true },
  status: { type: String, enum: ['Pending','Accepted', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

const ApplyJob = mongoose.model('Apply', applySchema);
export default ApplyJob
