// AdminDashboard.tsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from 'lodash.debounce'
import { toast } from "react-toastify";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    getAllUser();
  }, []);


  const getAllUser = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/getAllUser`
    );
    setUsers(res.data.data);
  };


  // search 
  const searchUser = useMemo(() => debounce(async (query: string) => {
    if (!query.trim()) {
      await getAllUser();
      return;
    }
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getSearch?search=${query}`);
    setUsers(res.data.searchResult);
  }, 300), []);



  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("are you sure want to delete this user")
      if (!confirm) return

      const deleteUser = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/deleteUser/${id}`)

      if (deleteUser.status === 200) {
        toast.success("delete success ===>")
        await getAllUser()
      } else {
        toast.error("delete failed")
      }
    } catch (error) {

    }
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };


  // submit
  const handleEditSubmit = async () => {
    if (!editUser) return;

    const originalUser = users.find((u) => u._id === editUser._id);
    if (!originalUser) return;

    if (
      originalUser.fullName === editUser.fullName.trim() &&
      originalUser.email === editUser.email.trim()
    ) {
      toast.info("No changes made!");
      return;
    }

    if (!editUser.fullName.trim()) {
      toast.error("Full Name is required");
      return;
    }

    if (!editUser.email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editUser.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const confirmUpdate = window.confirm("Are you sure you want to update this user?");
    if (!confirmUpdate) return;

    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/admin/updateUser/${editUser._id}`,
      editUser
    );
    console.log(res.data);
    toast.success("updated successfully ===>>> ")
    await getAllUser();

    setIsModalOpen(false);
  };



  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full mb-6 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          searchUser(e.target.value);
        }}
      />



      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3">Profile</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined on</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    {user.profileImg ? (
                      <img
                        src={user.profileImg}
                        alt={user.fullName || "User"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize"><td className="px-4 py-3">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : "not defined"}</td>
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={editUser.fullName}
              onChange={(e) => setEditUser({ ...editUser, fullName: e.target.value })}
              placeholder="Full Name"
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              placeholder="Email"
              className="w-full mb-3 px-3 py-2 border rounded-lg"
            />


            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
