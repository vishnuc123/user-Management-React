import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/customRequest";
import jwt, { JwtPayload } from 'jsonwebtoken'

// middleware/authenticateAdmin.ts
export const authenticateAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies['AdminAccess-token'];
    console.log("admin token", token);

    if (!token) return res.status(401).json({ message: "authorization blocked" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SCREAT as string) as string | JwtPayload;
        console.log("admin auth verify", verified);

        if (typeof verified !== "string" && verified.admin) {
            req.isAdmin = true;
        } else {
            return res.status(403).json({ message: "Only admins allowed" });
        }
        next();

    } catch {
        res.status(401).json({ message: "token is not valid" });
    }
};
