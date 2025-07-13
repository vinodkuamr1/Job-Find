import express from 'express'
import { recruiterLogin, recruiterRegister, userLogin, userRegister } from '../controllers/authController.js'
import upload from '../middlewares/multer.js'

const authRouter = express.Router()

authRouter.post('/register',userRegister)
authRouter.post('/login',userLogin)

authRouter.post('/recruiter/register',upload.single('logo'),recruiterRegister)
authRouter.post('/recruiter/login',recruiterLogin)

export default authRouter