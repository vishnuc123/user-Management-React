import { UserDTO } from "../interfaces/IUserDTO";
import { IUserDocument } from "../models/UserModel";

export function CheckUserDto(userDetails: IUserDocument): UserDTO {
    return {
        id: userDetails.id,
        fullName: userDetails.fullName,
        email: userDetails.email,
        createdAt: userDetails.createdAt
    }
}