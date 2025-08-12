export type TUserDetails = {
    id:string,
    email:string,
    fullName:string,
    createdAt:Date;
}

export type TauthState = {
    user: TUserDetails | null,
    loading:boolean,
    isAuthenticated:boolean
    error:string;
}