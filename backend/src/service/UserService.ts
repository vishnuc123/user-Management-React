import { inject, injectable } from "inversify";
import { UserTokens } from "../container/UserTokens";
import { Tlogin, TSignUp } from "../types/AuthTypes";
import { userRepository } from "../repository/UserRepository";
import bcrypt from 'bcrypt'
import { generateRefreashToken, generateToken } from "../helpers/generateToken";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

@injectable()
export class userService {
    constructor(@inject(UserTokens.userRepository) private userRepo: userRepository) { }
    handleSignUpLogic = async (data: TSignUp) => {
        const { fullName, email, password } = data
        const userExist = await this.userRepo.findUserByEmail(email)
        if (userExist) {
            throw new Error("User Already Exist")
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            fullName,
            email,
            password: hashedPassword,
        }
        const RegisterUser = await this.userRepo.registerUser(newUser)

        if (!RegisterUser) {
            throw new Error("user not created")
        }
        return RegisterUser
    }


    handleLoginLogic = async (data: Tlogin) => {
        const { email, password } = data
        const userExist = await this.userRepo.findUserByEmail(email)
        if (userExist) {
            console.log("user exist")
            const passVerify = await bcrypt.compare(password, userExist.password)
            if (passVerify) {
                const userDetails = userExist
                const userId = userDetails._id as string

                const accessToken = generateToken(userId)
                const refreashToken = generateRefreashToken(userId)
                console.log(accessToken, refreashToken)

                return {
                    user: userDetails,
                    accessToken: accessToken,
                    refreashToken: refreashToken,
                }
            }
        } else {
            console.log("cannot find user")
        }
    }

    handleGetUserService = async (userId: string) => {
        try {
            const RequestRepoUserData = await this.userRepo.getUserById(userId)
            return RequestRepoUserData
        } catch (error) {
            console.log('error while getting data', error)
        }
    }
    verifyRefreashToken = ( refresh_token: string) => {
        try {
            const verified = Jwt.verify(
                refresh_token,
                process.env.JWT_REFREASH_SCREAT as string) as {userId:string}
            
                console.log("service verified",verified);
                
            const newAccessToken = generateToken(verified.userId);
            return { newAccessToken,id: verified.userId };
        } catch (err) {
         console.log("error while jwt refreash handleing ",err)
        }
    }
}