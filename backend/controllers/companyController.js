import Company from "../models/companyModel.js";

export const getCompanyData = async (req,res) => {
  try {

    const companyId = req.recruiter._id;

    const company = await Company.findById(companyId).select("-password")

    res.status(200).json({success:true,company})
    
  } catch (error) {
     console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
