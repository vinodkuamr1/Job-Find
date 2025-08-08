import express from 'express'
import { authenticateRecruiter } from '../middlewares/authMiddleware.js'
import { getCompanyData } from '../controllers/companyController.js'

const companyRouter = express.Router()

companyRouter.get('/company',authenticateRecruiter,getCompanyData)

export default companyRouter