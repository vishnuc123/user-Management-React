import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (payload:object) => {
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SCREAT as string,
        {expiresIn:"10m"}
    )
    return accessToken
}

export const generateRefreashToken = (payload:object) => {
    const refreashToken = jwt.sign(
        payload,
        process.env.JWT_REFREASH_SCREAT as string,
        {expiresIn:"5d"}
    )
    return refreashToken
}
