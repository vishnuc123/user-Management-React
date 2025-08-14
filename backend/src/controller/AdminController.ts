import { Request, Response } from "express";
import { inject } from "inversify";
import { AdminTokens } from "../container/AdminTokens";
import { AdminService } from "../service/AdminService";

export class AdminController {
    constructor(@inject(AdminTokens.admin_service) private AdminService: AdminService) { }

    handeAdminLogin = async (req: Request, res: Response) => {
        try {
            console.log(req.body);

            const { email, password } = req.body
            if (!email) {
                return res.status(400).json({ message: "invalid email" })
            }
            if (!password) {
                return res.status(400).json({ message: "invalid password" })
            }

            const RequestAdminLoginService = this.AdminService.handleAdminLogin(email, password)
            if (!RequestAdminLoginService) {
                return res.status(404).json({ message: "admin LOGIN FAILED", })
            }
            console.log("hello admin");



            res.cookie('AdminAccess-token', RequestAdminLoginService.accessToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 20 * 1000 })
            res.cookie('AdminRefreash-token', RequestAdminLoginService.refreshToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 5 * 24 * 60 * 60 * 1000 })

            return res.status(200).json({ message: "admin login success ===> ", AdminData: RequestAdminLoginService })
        } catch (error) {
            res.status(500).json({ message: "internal servor error" })
        }
    }
    getAdminDetailscontrol = async (req: Request, res: Response) => {
        const RequestGetAdminService = this.AdminService.handleGetAdminDetails()
        res.status(200).json({ message: "asdas" })
    }


    handleGetAllUser = async (req: Request, res: Response) => {
        try {
            const users = await this.AdminService.handleGetAllUser(); // Fetch all users
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch users",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    handleEditUser = async (req:Request,res:Response) => {
        try {
            const {email,fullName} = req.body
        const UserId = req.params.id
        const payload = {
            email,
            fullName
        }

        const RequestServiceEdit = this.AdminService.handleEditService(UserId,payload)
        if(!RequestServiceEdit){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({message:"user updated"})
        } catch (error) {
            res.status(500).json({message:"internal server error",error})
        }
    }

    handleDeleteUser = async (req:Request , res:Response) => {
        try {
            const userId = req.params.id
            const RequestDeleteService = this.AdminService.removerUser(userId)
            if(!RequestDeleteService){
                return res.status(404).json({message:"user not found"})
            }
            return res.status(200).json({message:"user removed successfully"})
        } catch (error) {
            res.status(500).json({message:"internal server error"})
        }
    }
    handleGetSearch = async (req:Request,res:Response) => {
        try {
            const search = req.query.search as string
        const RequestSearchService = await this.AdminService.GetSearchResults(search)
        console.log(RequestSearchService);
        
        if(!RequestSearchService){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({message:"search success ===>",searchResult:RequestSearchService})
        } catch (error) {
            res.status(500).json({message:"internal error occur"})
        }

    }

}