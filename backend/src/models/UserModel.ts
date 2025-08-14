import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/IUser";

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg:{type:String,required:true,default:"/profile-pic.jpg"},
    role: { type: String,enum:["admin","user"], default: "user" },
    createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model<IUserDocument>("Users", UserSchema);
export default userModel;