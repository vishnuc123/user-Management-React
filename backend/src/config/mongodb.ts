import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();

export const connectDb = async () => {
    try {
        const dburl = process.env.MONGO_URI as string

        if(!dburl)throw new Error('mongodb connecting failed')


        await mongoose.connect(dburl)
        console.log('mongo db connected succefully')
    } catch (error) {
        console.log('error while connecting to mongodb')
    }
}