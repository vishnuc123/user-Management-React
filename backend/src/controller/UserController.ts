import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { UserTokens } from "../container/UserTokens";
import { userService } from "../service/UserService";
import { CheckUserDto } from "../dtos/userDtos";
import { CustomRequest } from "../interfaces/customRequest";

@injectable()
export class UserController {

    constructor(@inject(UserTokens.userService) private userService: userService) { }
    handleLogin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.status(400).json({ message: "Bad Request || missing required fields" })
            }

            const data = req.body
            const RequestLoginService = await this.userService.handleLoginLogic(data)

            if (!RequestLoginService) {
                return res.status(401).json({ message: "Invalid email or password" });
            }


            res.cookie('access-token', RequestLoginService.accessToken, { httpOnly: true,secure:true, sameSite: "strict", maxAge: 20* 1000 })
            res.cookie('refreash_token', RequestLoginService.refreashToken, { httpOnly: true,secure:true, sameSite: "strict", maxAge: 5 * 24 * 60 * 60 * 1000 })

            console.log(RequestLoginService)

            return res.status(200).json({
                message:"Login success ===>",
                user:RequestLoginService
            })

        } catch (error) {
            console.log("internal server error", error)
        }
    }

    handleSignUp = async (req: Request, res: Response) => {
        try {
            const { fullName, email, password } = req.body
            console.log(req.body);


            if (!email || !password || !fullName) {
                res.status(400).json({ message: "bad Request || missing fields" })
            }
            const data = req.body
            const RequestSignUpService = await this.userService.handleSignUpLogic(data)

            const datatoFrontend = CheckUserDto(RequestSignUpService)
            console.log(datatoFrontend);
            res.status(200).json({
                success: true,
                message: "User created successfully",
                userDetails: datatoFrontend
            });
        } catch (error) {
            console.log("internal server error", error)
        }
    }

    handleGetUser = async (req:CustomRequest ,res:Response) => {
        try {
            console.log("hai");
            
            const userId = req.userId as string
            const RequestDataToService = await this.userService.handleGetUserService(userId)
            
            // if(!RequestDataToService){
            //     return res.status(404).json({message:"user is not existing"})
            // }
            return res.status(200).json({message:"user exist success ===> ",user:RequestDataToService})
            
        } catch (error) {
            console.log('internal server error',error)
        }
    }
    handleLogout = (req:Request ,res:Response) => {
        res.clearCookie('access-token',{
            httpOnly:true,
            secure:true,
            sameSite:"strict"
        })

        res.clearCookie('refreash_token' , {
            httpOnly:true,
            secure:true,
            sameSite:"strict"
        })

        return res.status(200).json({message:"logout success ====>"})
    }

    verifyRefreash = async (req:CustomRequest, res:Response) => {
        try {

            console.log('verify refreash');
            
            

            
            const refreashToken = req.cookies['refreash_token']
            const verifyService = this.userService.verifyRefreashToken(refreashToken)
            console.log(verifyService)
            
        if (!verifyService) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }


            res.cookie('access-token', verifyService.newAccessToken, { httpOnly: true,secure:true, sameSite: "strict", maxAge: 20* 1000 })
            console.log('created');
            req.userId = verifyService.id as string
            console.log("verify service",verifyService);
            
            
            return res.status(200).json({ message: "Access token refreshed" });
        } catch (error) {
            res.status(500).json({message:"internal server error"})
        }
    }
}