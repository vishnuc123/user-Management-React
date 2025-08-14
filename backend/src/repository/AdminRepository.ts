import { injectable } from "inversify";
import userModel from "../models/UserModel";

@injectable()
export class adminRepository {
    GetAllUsers = async () => {
        const AllUser = await userModel.find({})
        return AllUser ?? null
    }

    getUserById = async (userid: string) => {
        const result = await userModel.findById(userid)
        return result
    }
    UpdateUser = async (userId: string, payload: { email: string, fullName: string }) => {
        try {
            // Find user by ID and update
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { $set: payload },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                throw new Error("User not found");
            }

            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };


    removeUserById = async (userId: string) => {
        const deletedUser = await userModel.findByIdAndDelete(userId);

        return deletedUser ?? null
    }

    searchByQuery = async (queary : string) => {
        const users = await userModel.find({
            fullName:{$regex:queary,$options:"i"}
        }).limit(10);
        return users ?? null
    }
}
