import express from 'express'
import connectDb from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobRoutes.js'
import userRouter from './routes/userRoutes.js'
dotenv.config()

const app = express()

app.use(cors());
app.use(express.json());


connectDb()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('API WORKING')
})


app.use('/api/auth',authRouter)
app.use('/api/job',jobRouter)
app.use('/api/user',userRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})