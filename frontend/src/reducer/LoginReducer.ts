import type { loginFormActions } from "../actions/LoginFormAction";
import type { TloginState } from "../types/TloginState";

export const initialLoginState:TloginState = {
    email:"",
    password:"",
    emailError:"",
    passwordError:"",
}
export function LoginFormReducer(state:TloginState,action:loginFormActions){
    switch(action.type){
        case "SET_EMAIL":
            return {...state,email:action.payload};
        case "SET_PASSWORD":
            return {...state,password:action.payload};
        case "EMAIL_ERROR":
            return {...state,emailError:action.payload}
        case "PASSWORD_ERROR":
            return {...state,passwordError:action.payload}
    }
}