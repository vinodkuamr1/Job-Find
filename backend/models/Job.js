import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  title: { type: String, required: true },
  salary: { type: Number, required: true },
  location: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    enum: ['Entry Level', 'Junior Level', 'Mid Level', 'Senior Level'],
    required: true,
  },
  jobtype: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true,
  },
  deadline: { type: String, required: true },
  description: { type: String, required: true },
  shortdescription: { type: String, required: true },
}, { timestamps: true });

const jobModel = mongoose.model('Jobs', jobSchema);
export default jobModel;
