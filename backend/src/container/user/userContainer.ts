import { Container } from "inversify";
import { UserTokens } from "../UserTokens";
import { UserController } from "../../controller/UserController";
import { userService } from "../../service/UserService";
import { userRepository } from "../../repository/UserRepository";
import { UserRoute } from "../../routes/userRoute";

export const UserContainer = (container: Container) => {
    container.bind(UserTokens.userController).to(UserController);
    container.bind(UserTokens.userService).to(userService);
    container.bind(UserTokens.userRepository).to(userRepository);
    container.bind(UserTokens.userRouter).to(UserRoute);
};
