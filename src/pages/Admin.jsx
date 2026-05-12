import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import './Admin.css'

const dummyContent = Array(12).fill(null).map((_, i) => ({
  id: i,
  title: `Artwork ${i + 1}`,
  artist: `Artist ${i + 1}`,
  reportCount: Math.floor(Math.random() * 10) + 1,
  image: 'https://picsum.photos/400/300?random=' + i
}))

export default function Admin() {
  const navigate = useNavigate()
  const [content, setContent] = useState(dummyContent)
  const [removed, setRemoved] = useState([])

  // Redirect if not admin
  const role = localStorage.getItem('role')
  if (role !== 'admin') {
    navigate('/home')
    return null
  }

  const handleRemove = (id) => {
    setRemoved(prev => [...prev, id])
    setContent(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="admin-page">
      <nav className="admin-navbar">
        <Link to="/home">
          <img src={logo} alt="ArtMatch Logo" className="logo" />
        </Link>
        <div className="admin-badge">Admin Panel</div>
        <img src={accLogo} alt="Profile" className="profile-icon" />
      </nav>

      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Content Moderation</h1>
          <p className="admin-subtitle">
            {content.length} items • {removed.length} removed this session
          </p>
        </div>

        {content.length === 0 ? (
          <div className="admin-empty">
            <p>✅ No content to moderate</p>
          </div>
        ) : (
          <div className="admin-grid">
            {content.map((item) => (
              <div key={item.id} className="admin-card">
                <img src={item.image} alt={item.title} className="admin-card-image" />
                <div className="admin-card-info">
                  <p className="admin-card-title">{item.title}</p>
                  <p className="admin-card-artist">{item.artist}</p>
                  <p className="admin-card-reports">⚠️ {item.reportCount} reports</p>
                </div>
                <button
                  className="admin-remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}