import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { FetchUserDetails } from "../../store/auth/AuthThunk";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Profile = () => {
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    if (auth.user === null) {
      dispatch(FetchUserDetails()).unwrap().then((data) => {
        console.log("Fetched user:", data);
        if (!data) {
          navigate("/");
        }
      })
        .catch(() => navigate("/"));
    }
  }, []);

  // useEffect(() => {
  //   if(!auth.user){
  //     dispatch(FetchUserDetails()).then((response) => {
  //       console.log("dispatched fetch user details",response.payload)
  //     })
  //   }
  // },[])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    if (!selectedFile) return toast.error("No image selected");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET as string);

      const cloudRes = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,formData)
      const cloudUrl = cloudRes.data.secure_url;
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/updateProfileImg`,{ profileImg: cloudUrl },{ withCredentials: true })

      toast.success("Profile image updated!");
      dispatch(FetchUserDetails());
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile image");
    } finally {
      setUploading(false);
    }
  };

  if (auth.loading) return <p>Loading profile...</p>;
  if (auth.error) return <p>{auth.error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">User Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={previewImage || auth.user?.profileImg || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-2">
            Select Image
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {selectedFile && (
            <button
              onClick={handleUpdateProfile}
              disabled={uploading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              {uploading ? "Uploading..." : "Update Profile Image"}
            </button>
          )}
        </div>

        {/* User Details */}
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Name:</strong> {auth.user?.fullName ?? "Not defined"}
          </p>
          <p>
            <strong>Email:</strong> {auth.user?.email ?? "Not defined"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
