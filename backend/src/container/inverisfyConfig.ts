import { Container } from "inversify";
import { UserContainer } from "./user/userContainer";
import { AdminContainer } from "./admin/AdminContainer";

const container = new Container();
UserContainer(container);
AdminContainer(container)

export default container;
