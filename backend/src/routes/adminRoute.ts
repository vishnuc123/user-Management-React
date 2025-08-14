import { inject, injectable } from "inversify";
import { BaseRoute } from "./BaseRoute";
import { AdminTokens } from "../container/AdminTokens";
import { AdminController } from "../controller/AdminController";
import { authenticateAdmin } from "../middlewares/AdminAuthenticate";

@injectable()
export class AdminRoute extends BaseRoute{
    constructor(@inject(AdminTokens.admin_controller) private AdminController:AdminController){
        super()
        this.initRoute()
    }
    initRoute = () => {
        this.router.route('/adminLogin').post(this.AdminController.handeAdminLogin)
        this.router.route('/getAdmin').get(authenticateAdmin,this.AdminController.getAdminDetailscontrol)
        this.router.route('/getAllUser').get(this.AdminController.handleGetAllUser)
        this.router.route('/updateUser/:id').put(this.AdminController.handleEditUser)
        this.router.route('/deleteUser/:id').delete(this.AdminController.handleDeleteUser)
        this.router.route('/getSearch').get(this.AdminController.handleGetSearch)
    }

}