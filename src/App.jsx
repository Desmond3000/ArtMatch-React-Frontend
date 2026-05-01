import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Landing from './pages/Landing'
import ArtistDashboard from './pages/ArtistDashboard' 
import EditProfile from './pages/EditProfile'
import RoleSelect from './pages/RoleSelect'
import ViewerProfile from './pages/ViewerProfile'
import ArtistProfile from './pages/ArtistProfile'
import PaintingDetail from './pages/PaintingDetail'
import Post from './pages/Post'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/paintings" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ArtistDashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/viewer-profile" element={<ViewerProfile />} />
        <Route path="/artist/:id" element={<ArtistProfile />} />
        <Route path="/Post" element={<Post/>}/>
        <Route path="/paintings/:id" element={<PaintingDetail />} />
      </Routes>
    </BrowserRouter>
  )
}