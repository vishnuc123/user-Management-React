import React, { useReducer } from "react";
import { initialState, SignUpFormReducer } from "../../reducer/SignUpReducer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/AxiosInterceptor";

const Signup = () => {
    const navigate = useNavigate()
    const [state,dispatch] = useReducer(SignUpFormReducer,initialState)    

    const handleValidation = async (e:React.FormEvent) => {
        e.preventDefault();
        
        let isError = false

        if(!state.fullName.trim().match(/^[A-Za-z\s]{2,}$/)){
            dispatch({type:"SET_FULL_NAME_ERROR",payload:"only character and alphabet are allowed"})
            isError = true
        }else{
            dispatch({type:"SET_FULL_NAME_ERROR",payload:""})
        }

        if(!state.email.trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)){
            dispatch({type:"SET_EMAIL_ERROR",payload:"add a proper email"})
            isError = true
        }else{
            dispatch({type:"SET_EMAIL_ERROR",payload:""})
        }

        if(!state.password.trim().match(/^[A-Za-z\d@$!%*?&]{8,15}$/)){
            dispatch({type:"SET_PASSWORD_ERROR",payload:"password must be include alphabet special character capital letter"})
            isError = true
        }else{
            dispatch({type:"SET_PASSWORD_ERROR",payload:""})
        }
        if(state.confirmPassword.trim() !== state.password){
            dispatch({type:"SET_CONFIRM_PASSWORD_ERROR",payload:"confirm password must be match to password"})
            isError = true
        }else{
            dispatch({type:"SET_CONFIRM_PASSWORD_ERROR",payload:""})
        }

        if(!isError){
            console.log("form submitted successfully",state)

            const data = {
                fullName:state.fullName,
                email:state.email,
                password:state.password,
            }
            const sendSignUpData =await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/sendSignUp`,data)
            if(sendSignUpData.status=== 200){
                console.log("user ceated successfully")
                navigate("/userDashboard")
            }else{
                console.log("user not created")
            }

        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

                <form className="space-y-5" onSubmit={handleValidation}>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={state.fullName}
                            onChange={(e) => dispatch({type:"SET_FULL_NAME",payload:e.target.value})}
                            placeholder="John Doe"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {state.fullNameError && <p className="text-red-500">{state.fullNameError}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={state.email}
                            onChange={(e) => dispatch({type:"SET_EMAIL",payload:e.target.value})}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {state.EmailError && <p className="text-red-500">{state.EmailError}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={state.password}
                            onChange={(e)=> dispatch({type:"SET_PASSWORD",payload:e.target.value})}
                            // placeholder="••••••••"    
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {state.passwordError && <p className="text-red-500">{state.passwordError}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={state.confirmPassword}
                            onChange={(e) => dispatch({type:"SET_CONFIRM_PASSWORD",payload:e.target.value})}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {state.confirmPasswordError && <p className="text-red-500">{state.confirmPasswordError}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Already have an account */}
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
