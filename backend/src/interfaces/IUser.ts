export interface IUser{
    fullName: string;
    email: string;
    password: string;
    profileImg?:string
    role: string;
    createdAt: Date;
}