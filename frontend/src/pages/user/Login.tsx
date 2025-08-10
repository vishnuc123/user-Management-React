import React, { useReducer } from "react";
import { initialLoginState, LoginFormReducer } from "../../reducer/LoginReducer";
import axios from "axios";

const Login = () => {
    const [state,dispatch] = useReducer(LoginFormReducer,initialLoginState)


    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        let isError = false

        if(!state.email.trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)){
            dispatch({type:"EMAIL_ERROR",payload:"email format is not matching recheck Email"})
            isError=true
        }else{
            dispatch({type:"EMAIL_ERROR",payload:""})
        }
        if(!state.password.trim().match(/^[A-Za-z\d@$!%*?&]{8,15}$/)){
            dispatch({type:"PASSWORD_ERROR",payload:"password must be include alphabet special character capital letter"})
            isError = true
        }else{
            dispatch({type:"PASSWORD_ERROR",payload:""})
        }

        if(!isError){
            console.log("form submitted sucess ===>")
            const data = {
                email:state.email,
                password:state.password
            }
            const SendLoginData = axios.post("/sendLogin",data)
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form className="space-y-5" onSubmit={handleLogin}>
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
            {state.emailError && <p className="text-red-500">{state.emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={state.password}
              onChange={(e) => dispatch({type:"SET_PASSWORD",payload:e.target.value})}
              placeholder="••••••••"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
                        {state.passwordError && <p className="text-red-500">{state.passwordError}</p>}

          </div>


          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
