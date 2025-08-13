import Navbar from '../../components/Navbar';
import {  useDispatch, useSelector } from 'react-redux';
import type {  AppDispatch, RootState } from '../../store/store';
import { FetchUserDetails } from '../../store/auth/AuthThunk';
import { useEffect } from 'react';

const UserDashboard = () => {

  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state:RootState) => state.auth)
  
  useEffect(() => {
        if(!auth.user){
                  dispatch(FetchUserDetails()).then((response) => {
                      console.log("dispatched fetch user details",response.payload)
                    })
                }
          },[])
        
    //     const auth = useSelector((state:RootState) => state.auth)

    
    // if (auth.loading) return <p>Loading profile...</p>;
    
    return (
        <div className="p-6 w-screen h-screen mx-auto bg-white rounded shadow">
            <Navbar />
            <div className='w-screen h-screen flex-col items-center justify-center'>
                <h1 className="text-3xl font-semibold mb-4 ">User Dashboard</h1>
                <p>Welcome to your dashboard! Here you can see your details and activity.</p>
            </div>
        </div>
    );
};

export default UserDashboard;
