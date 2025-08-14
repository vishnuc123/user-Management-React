import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { FetchUserDetails } from '../../store/auth/AuthThunk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {

    const dispatch = useDispatch<AppDispatch>()
    const auth = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()


useEffect(() => {
    if (auth.user === null) { // null means not loaded yet
        dispatch(FetchUserDetails())
            .unwrap()
            .then((data) => {
                console.log("Fetched user:", data);
                if (!data) {
                    navigate("/");
                }
            })
            .catch(() => navigate("/"));
    }
}, []);



    // useEffect(() => {
    //     if (!auth.user) {
    //         dispatch(FetchUserDetails()).then((response) => {
    //             console.log("dispatched fetch user details", response.payload)

    //             if (!response.payload) {
    //                 console.warn("User not found in DB, redirecting to login...");
    //                 navigate("/");
    //             }
    //         })
    //     }
    // }, [auth.user,dispatch,navigate])

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
