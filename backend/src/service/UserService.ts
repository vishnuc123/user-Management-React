import { inject, injectable } from "inversify";
import { UserTokens } from "../container/UserTokens";
import { TSignUp } from "../types/AuthTypes";
import { userRepository } from "../repository/UserRepository";
import bcrypt from 'bcrypt'

@injectable()
export class userService {
    constructor(@inject(UserTokens.userRepository) private userService:userRepository){}
    handleSignUpLogic =async (data:TSignUp) => {
        const {fullName,email,password} = data
        const userExist = await this.userService.findUserByEmail(email)
        if(userExist){
            throw new Error("User Already Exist")
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = {
            fullName,
            email,
            password:hashedPassword,
        }
        const RegisterUser = await this.userService.registerUser(newUser)


        
        if(!RegisterUser){
            throw new Error("user not created")
        }
        return RegisterUser
    }
}