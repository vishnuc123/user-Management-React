import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { AdminLoginStart, AdminLoginSuccess } from '../../store/Admin/AdminSlice';
import { data, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPop, setShowPop] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const adminauth = useSelector((state:RootState) => state.adminauth)

  const showError = (message: string) => {
    setError(message);
    setShowPop(true);

    setTimeout(() => {
      setShowPop(false);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showError('Email is required');
      return;
    }

    if (!password || password.length < 4) {
      showError('Password is invalid — at least 4 characters required');
      return;
    }

    setError('');
    setShowPop(false);
    try {
      const data = {email:email,password:password}
      dispatch(AdminLoginStart())
      console.log('adminlogin start');
      
      const result =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/adminLogin`,data,{withCredentials:true})
      
      if(result.status === 200){
        dispatch(AdminLoginSuccess())
        console.log("login success")
        navigate('/admin/adminDashboard')
      }else{
        dispatch(AdminLoginSuccess())
      }
    } catch (error) {
      console.log("error while submitting data")
    }


  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded-xl shadow-md relative">
      {showPop && error && (
        <div className="absolute top-[-50px]  -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
