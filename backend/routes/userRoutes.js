import express from 'express'
import { getAllJobsUser, getUserApplyJobs, getUserProfile } from '../controllers/userController.js'
import { authenticateRecruiter, authenticateUser } from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.get('/get-jobs',getAllJobsUser)
userRouter.get('/apply-jobs',authenticateUser,getUserApplyJobs)
userRouter.get('/profile',authenticateUser,getUserProfile)

export default userRouter