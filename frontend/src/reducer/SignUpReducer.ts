import type { SignUpFormAction } from "../actions/signupFormActions";
import type { TSignupState } from "../types/TSignUpState";

export const initialState:TSignupState={
    fullName:"",
    fullNameError:"",
    email:"",
    emailError:"",
    password:"",
    passwordError:"",
    confirmPassword:"",
    confirmPasswordError:""
}

export function SignUpFormReducer(state:TSignupState,action:SignUpFormAction){
    switch(action.type){
        case "SET_FULL_NAME":
            return {...state,fullName:action.payload};
        
        case "SET_EMAIL":
            return {...state,email:action.payload};
        
        case "SET_PASSWORD":
            return {...state,password:action.payload};
        
        case "SET_CONFIRM_PASSWORD":
            return {...state,confirmPassword:action.payload};
        
        case "SET_FULL_NAME_ERROR":
            return {...state,fullNameError:action.payload};
        
        case "SET_EMAIL_ERROR":
            return {...state,emailError:action.payload};
        
        case "SET_PASSWORD_ERROR":
            return {...state,passwordError:action.payload};
        
        case "SET_CONFIRM_PASSWORD_ERROR":
            return {...state,confirmPasswordError:action.payload};
        
    }

}