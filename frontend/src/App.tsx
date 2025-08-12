import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/user/Login'
import Signup from './pages/user/SignUp'
import UserDashboard from './pages/user/UserDashboard'
import Profile from './pages/user/Profile'
import ProtectedRoute from './private/protectUserRoute'
import PublicRoute from './private/PublicRoute'

const App = () => {

  // useEffect(() => {
  //   const handleAuth = (e:Event) => {
  //     alert((e as CustomEvent<string>).detail)
  //   }

  //   window.addEventListener("authError",handleAuth)

  //   return () => removeEventListener('authError',handleAuth)
  // })
  return (
    <Router>
      <Routes>

       <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
<Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

<Route path="/UserDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


      </Routes>
    </Router>
  )
}

export default App
