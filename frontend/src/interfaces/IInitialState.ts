import type { TloginState } from "../types/TloginState";
import type { TSignupState } from "../types/TSignUpState";

export interface TLoginInitialState{
    value:TloginState,
    error:TloginState
}

export interface TinitialState{
    values:TSignupState,
    errors:TSignupState,
}