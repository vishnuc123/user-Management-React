import { Container } from "inversify";
import { AdminTokens } from "../AdminTokens";
import { AdminController } from "../../controller/AdminController";
import { AdminRoute } from "../../routes/adminRoute";
import { AdminService } from "../../service/AdminService";
import { adminRepository } from "../../repository/AdminRepository";

export const AdminContainer = (container:Container) => {
    container.bind(AdminTokens.admin_controller).to(AdminController)
    container.bind(AdminTokens.admin_route).to(AdminRoute)
    container.bind(AdminTokens.admin_service).to(AdminService)
    container.bind(AdminTokens.admin_repository).to(adminRepository)
}
