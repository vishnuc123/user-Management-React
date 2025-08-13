import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./private/PublicRoute";
import Login from "./pages/user/Login";
import ProtectedRoute from "./private/protectUserRoute";
import UserDashboard from "./pages/user/UserDashboard";
import Profile from "./pages/user/Profile";
import Signup from "./pages/user/SignUp";
import AdminLogin from "./pages/admin/AdminLogin";


function App() {
  return (
    <Router>
      <Routes>

        {/* admin */}
        <Route path="/admin" element={<AdminLogin />}/>


        {/* Public routes */}
       
       <Route element={<PublicRoute />}>

          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
       </Route>
          {/* other public routes */}
    

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/UserDashboard" element={<UserDashboard/>} />
          <Route path="/UserDashboard/profile" element={<Profile />} />
          {/* other protected nested routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
