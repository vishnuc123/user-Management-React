import { inject, injectable } from "inversify";
import { UserTokens } from "../container/UserTokens";
import { Tlogin, TSignUp } from "../types/AuthTypes";
import { userRepository } from "../repository/UserRepository";
import bcrypt from 'bcrypt'
import { generateRefreashToken, generateToken } from "../helpers/generateToken";

@injectable()
export class userService {
    constructor(@inject(UserTokens.userRepository) private userRepo:userRepository){}
    handleSignUpLogic =async (data:TSignUp,userId:string) => {
        const {fullName,email,password} = data
        const userExist = await this.userRepo.findUserByEmail(email)
        if(userExist){
            throw new Error("User Already Exist")
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = {
            fullName,
            email,
            password:hashedPassword,
        }
        const RegisterUser = await this.userRepo.registerUser(newUser)

        if(!RegisterUser){
            throw new Error("user not created")
        }
        return RegisterUser
    }


    handleLoginLogic = async (data:Tlogin) => {
        const {email,password} = data
        const userExist = await this.userRepo.findUserByEmail(email)
        if(userExist){
            console.log("user exist")
            const passVerify = await bcrypt.compare(password,userExist.password)
            if(passVerify){
                const userDetails = userExist
                const userId = userDetails._id as string

                const accessToken = generateToken(userId)
                const refreashToken = generateToken(userId)

                return {
                    user:userDetails,
                    accessToken:accessToken,
                    refreashToken:refreashToken,
                }
            }
        }
    }
}