import { inject, injectable } from "inversify";
import { BaseRoute } from "./BaseRoute";
import { UserTokens } from "../container/UserTokens";
import { UserController } from "../controller/UserController";
import { authenticate } from "../middlewares/authenticate";

@injectable()
export class UserRoute extends BaseRoute{
    constructor(@inject(UserTokens.userController) private userController:UserController){
        super()
        this.initRoute()
    }
    initRoute(){
        this.router.post('/sendLogin',this.userController.handleLogin)
        this.router.post("/sendSignUp",this.userController.handleSignUp)
        this.router.get('/auth/getUser',authenticate,this.userController.handleGetUser)
        this.router.post('/logout',this.userController.handleLogout)
        this.router.get('/refresh-token',this.userController.verifyRefreash)
    }
    
}