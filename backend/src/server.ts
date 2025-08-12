import express, { Request, Response } from 'express'
import cors from 'cors'
import container from './container/inverisfyConfig'
import { UserRoute } from './routes/userRoute'
import { UserTokens } from './container/UserTokens'
import { connectDb } from './config/mongodb'
import cookieParser from 'cookie-parser'

const app = express()
const allowedOrigins = ['http://localhost:2000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const userRouter = container.get<UserRoute>(UserTokens.userRouter)

app.use('/',userRouter.router)


// test
app.get('/l',(req:Request,res:Response) => {
    res.send("hai")
})

connectDb()
app.listen(8000,()=> console.log("server is running"))