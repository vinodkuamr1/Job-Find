import ApplyJob from "../models/ApplyJob.js";
import jobModel from "../models/Job.js";
import User from "../models/userModel.js";



export const getAllJobsUser = async (req, res) => {
    try {

        const jobs = await jobModel.find({}).populate('companyId')

        res.status(200).json({ success: true, jobs })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getUserApplyJobs = async (req, res) => {
    try {
        const userId = req.user._id;

        const applyjobs = await ApplyJob.find({ userId })
            .populate({
                path: 'jobId',
                populate: {
                    path: 'companyId',
                    model: 'Company'
                }
            });

        res.status(200).json({
            success: true,
            applications: applyjobs,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

