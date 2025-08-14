import { inject, injectable } from "inversify";
import dotenv from 'dotenv'
import { AdminTokens } from "../container/AdminTokens";
import { adminRepository } from "../repository/AdminRepository";
import { generateRefreashToken, generateToken } from "../helpers/generateToken";
dotenv.config()

@injectable()
export class AdminService {
    constructor(@inject(AdminTokens.admin_repository) private adminRepository: adminRepository) { }
    handleAdminLogin = (email: string, password: string) => {
        if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASS === password) {
            const payload = {admin:true}
            const accessToken = generateToken(payload);
            const refreshToken = generateRefreashToken(payload);

            return {accessToken,refreshToken}
        }
        return null
    }

    handleGetAdminDetails = async () => {
        const GetAdminRepo = await this.adminRepository.GetAllUsers()
        if (!GetAdminRepo) {
            return null
        }
        return GetAdminRepo
    }
    
    handleGetAllUser = async () => {
        try {
            const getAllUser = await this.adminRepository.GetAllUsers()
            return getAllUser
        } catch (error) {
            console.log("error")
        }
    }

    handleEditService = async (userId : string,payload : {email:string,fullName:string}) => {
        try {
            const UpdateUser =await this.adminRepository.UpdateUser(userId,payload)
            return UpdateUser
        } catch (error) {
            console.log("error in the logic",error)
        }
    }
    removerUser = async  (userId:string) => {
        try {
            const DeleteUser = await this.adminRepository.removeUserById(userId)
            if(!DeleteUser){
                return null
            }
            return DeleteUser
        } catch (error) {
            console.log("error while handling delete",error)
        }
    }
    GetSearchResults = async (query:string) => {
        try {
            const getResult = this.adminRepository.searchByQuery(query)
            return getResult 

        } catch (error) {
            console.log("error while searching",error)
        }
    }
}