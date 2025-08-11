import express, { Request, Response } from 'express'
import cors from 'cors'
import container from './container/inverisfyConfig'
import { UserRoute } from './routes/userRoute'
import { UserTokens } from './container/UserTokens'
import { connectDb } from './config/mongodb'
const app = express()


app.use(cors())
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