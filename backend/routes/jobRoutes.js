import express from 'express'
import { addJob, applyJob, deletejobById, getAllJobs, getdashboardData, getUser, updateApplicationStatus } from '../controllers/jobController.js'
import { authenticateRecruiter, authenticateUser } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multer.js'

const jobRouter = express.Router()

jobRouter.post('/add',authenticateRecruiter,addJob)
jobRouter.get('/list',authenticateRecruiter,getAllJobs)
jobRouter.put('/delete/:id',authenticateRecruiter,deletejobById)
jobRouter.get('/users',authenticateRecruiter,getUser)

jobRouter.get('/dashboard',authenticateRecruiter,getdashboardData)

jobRouter.put('/status/:id',authenticateRecruiter,updateApplicationStatus)

jobRouter.post('/apply',authenticateUser,upload.single('resume'),applyJob)

export default jobRouter