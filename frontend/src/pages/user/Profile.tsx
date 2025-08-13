import {  useSelector } from "react-redux";
import type {  RootState } from "../../store/store";
import Navbar from "../../components/Navbar";


const Profile = () => {
    const auth = useSelector((state:RootState) => state.auth)

    if(!auth.isAuthenticated){
      
    }

// useEffect(() => {
//   if(!auth.user){
//     dispatch(FetchUserDetails()).then((response) => {
//       console.log("dispatched fetch user details",response.payload)
//     })
//   }
// },[])


  if (auth.loading) return <p>Loading profile...</p>;
  if (auth.error) return <p>{auth.error}</p>;

  return (
    <div className="p-6 w-screen h-screen mx-auto bg-white rounded shadow">
      <Navbar />
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {auth.user?.user?.fullName ?? 'not defined'}</p>
      <p><strong>Email:</strong> {auth.user?.user?.email ?? 'not defined'}</p>
    </div>
  );
};

export default Profile;
