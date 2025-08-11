import { Container } from "inversify";
import { UserContainer } from "./user/userContainer";

const container = new Container();
UserContainer(container);

export default container;
