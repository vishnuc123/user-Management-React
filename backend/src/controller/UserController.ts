import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { UserTokens } from "../container/UserTokens";
import { userService } from "../service/UserService";
import { CheckUserDto } from "../dtos/userDtos";

@injectable()
export class UserController {

    constructor(@inject(UserTokens.userService) private userService: userService) { }
    handleLogin = async (req: Request, res: Response) => {
        try {
            const {email,password}  = req.body
            if(!email || !password){
                res.status(400).json({message:"Bad Request || missing required fields"})
            }

            const data = req.body
            const RequestLoginService = this.userService.handleLoginLogic(data)
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
            const RequestSignUpService = await this.userService.handleSignUpLogic(data,userId)

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
}