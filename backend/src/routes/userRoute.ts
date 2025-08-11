import { inject, injectable } from "inversify";
import { BaseRoute } from "./BaseRoute";
import { UserTokens } from "../container/UserTokens";
import { UserController } from "../controller/UserController";

@injectable()
export class UserRoute extends BaseRoute{
    constructor(@inject(UserTokens.userController) private userController:UserController){
        super()
        this.initRoute()
    }
    initRoute(){
        this.router.post('/sendLogin',this.userController.handleLogin)
        this.router.post("/sendSignUp",this.userController.handleSignUp)
    }
    
}