import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/user/Home'
import Login from './pages/user/Login'
import Signup from './pages/user/SignUp'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
