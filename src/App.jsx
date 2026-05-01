import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Landing from './pages/Landing'
import ArtistDashboard from './pages/ArtistDashboard' 
import EditProfile from './pages/EditProfile'
import RoleSelect from './pages/RoleSelect'
import ViewerProfile from './pages/ViewerProfile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artist-dashboard" element={<ArtistDashboard />} /> {}
        <Route path="/edit-profile" element={<EditProfile />} /> {}
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/viewer-profile" element={<ViewerProfile />} />
      </Routes>
    </BrowserRouter>
  )
}