import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { CustomRequest } from "../interfaces/customRequest";
dotenv.config()




export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['access-token']
        if (!token) {
            return res.status(401).json({ message: "authorization blocked" })
        }
        const verified = jwt.verify(token, process.env.JWT_SCREAT as string) as string | JwtPayload
        // console.log(verified)

        if (typeof verified !== "string") {
            req.userId = verified.userId as string;
        }

        next()

    } catch (error) {
        res.status(401).json({ message: "token is not valid" })
    }
}