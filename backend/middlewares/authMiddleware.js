import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import companyModel from '../models/companyModel.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized user' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const authenticateRecruiter = async (req, res, next) => {
  try {
    const Ctoken = req.headers.authorization;
    if (!Ctoken) {
      return res.status(401).json({ success: false, message: 'Token not provided' });
    }

    const decoded = jwt.verify(Ctoken, process.env.JWT_SECRET);
    const recruiter = await companyModel.findById(decoded.id).select('-password');

    if (!recruiter) {
      return res.status(401).json({ success: false, message: 'Unauthorized recruiter' });
    }

    req.recruiter = recruiter;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
