import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (userId:string) => {
    const accessToken = jwt.sign(
        userId,
        process.env.JWT_SCREAT as string,
        {expiresIn:"10m"}
    )
    return accessToken
}

export const generateRefreashToken = (userId:string) => {
    const refreashToken = jwt.sign(
        userId,
        process.env.JWT_REFREASH_SECREAT as string,
        {expiresIn:"5d"}
    )
    return refreashToken
}
