import cloudinary from '../config/cloudinary.js';
import ApplyJob from '../models/ApplyJob.js';
import jobModel from '../models/Job.js';

export const addJob = async (req, res) => {
  try {
    const company = req.recruiter;
    const { title, salary, location, category, level, jobtype, description, deadline, shortdescription } = req.body;

    if (!title || !salary || !location || !category || !level || !jobtype || !description || !deadline || !shortdescription) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newJob = new jobModel({ companyId: company._id, title, salary, location, category, level, jobtype, description, deadline, shortdescription });

    await newJob.save();

    res.status(200).json({ success: true, message: "Job created successfully", job: newJob, company });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const companyId = req.recruiter._id;

    const jobs = await jobModel.find({ companyId });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deletejobById = async (req, res) => {
  try {

    const jobId = req.params.id;

    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    await job.deleteOne();
    res.status(200).json({ success: true, message: 'Job deleted successfully' });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const applyJob = async (req, res) => {
  try {
    const {
      jobId,
      name,
      email,
      phone,
      location,
      website,
      expectedSalary,
      coverLetter
    } = req.body;

    const userId = req.user._id;

    if (!jobId || !req.file || !name || !email || !phone) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const alreadyApplied = await ApplyJob.findOne({ jobId, userId });
    if (alreadyApplied) {
      return res.status(409).json({ success: false, message: "Already applied" });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const cloudinaryRes = await cloudinary.uploader.upload(base64, {
      resource_type: "auto",
      folder: "resumes"
    });

    const application = await ApplyJob.create({
      jobId,
      userId,
      name,
      email,
      phone,
      location,
      website,
      expectedSalary,
      coverLetter,
      resumeUrl: cloudinaryRes.secure_url,
      status: "Pending"
    });

    res.status(200).json({ success: true, message: "Applied successfully", application });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const companyId = req.recruiter._id;

    const allApplicants = await ApplyJob.find()
      .populate({
        path: 'jobId',
        select: 'title companyId',
      })
      .populate('userId');

    const applicants = allApplicants.filter(app => 
      app.jobId?.companyId?.toString() === companyId.toString()
    );

    res.status(200).json({ success: true, applicants });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Accepted', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updated = await ApplyJob.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Application status updated',
      applicant: updated,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getdashboardData = async (req, res) => {
  try {
    const companyId = req.recruiter._id;

    const totalJobs = await jobModel.countDocuments({ companyId });

    const applyJobs = await ApplyJob.countDocuments({
      jobId: { $in: await jobModel.find({ companyId }).distinct('_id') }
    });

    const totalUsers = await ApplyJob.distinct('userId', {
      jobId: { $in: await jobModel.find({ companyId }).distinct('_id') }
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalJobs,
        applyJobs,
        totalUsers: totalUsers.length
      }
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};