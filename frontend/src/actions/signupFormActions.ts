export type SignUpFormAction =| { type: "SET_FULL_NAME"; payload: string }
                | { type: "SET_FULL_NAME_ERROR"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_EMAIL_ERROR"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_PASSWORD_ERROR"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD_ERROR"; payload: string };
