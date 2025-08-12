import { injectable } from "inversify";
import { TSignUp } from "../types/AuthTypes";
import userModel from "../models/UserModel";

@injectable()
export class userRepository {
    constructor() { }
    findUserByEmail = async (email: string) => {
        const getUser = await userModel.findOne({ email: email })
        return getUser
    }


    registerUser = async (data: TSignUp) => {
        let newUser = {
            ...data,
        }
        const result = await userModel.create(newUser)
        return result
    }
    getUserById = async (userid:string) => {
        const result = await userModel.findById(userid)
        return result
    }
}