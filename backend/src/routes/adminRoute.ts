import { inject, injectable } from "inversify";
import { BaseRoute } from "./BaseRoute";

@injectable()
export class AdminRoute extends BaseRoute{
    constructor(@inject(adminT)){}
}