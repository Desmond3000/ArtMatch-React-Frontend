import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import './ArtistDashboard.css'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const savedPaintings = Array(12).fill(null).map((_, i) => ({
  id: i,
  title: 'Title',
  artist: 'Artist',
}))

// ❌ REMOVE THIS LINE — it was here (outside any function)
// const [isSaved, setIsSaved] = useState(true)

function TiltImage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [6, -6])
  const rotateY = useTransform(x, [-100, 100], [-6, 6])
  const springRotateX = useSpring(rotateX, { stiffness: 80, damping: 25 })
  const springRotateY = useSpring(rotateY, { stiffness: 80, damping: 25 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      style={{ perspective: 1000, padding: '20px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="modal-image"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
          borderRadius: '8px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        whileHover={{ scale: 1.01 }}
      />
    </div>
  )
}

export default function ViewerProfile() {
  const navigate = useNavigate()
  const [selectedPainting, setSelectedPainting] = useState(null)
  const [isSaved, setIsSaved] = useState(true) 

  return (
    <div className="page">
      <nav className="navbar">
        <Link to="/home">
          <img src={logo} alt="ArtMatch Logo" className="logo" />
        </Link>
        <img src={accLogo} alt="Profile" className="profile-icon" />
      </nav>

      <div className="dashboard">
        <div className="profile-section">
          <div className="profile-card">
            <img src={accLogo} className="avatar" alt="Avatar" />
            <h2 className="username">[Username]</h2>
            <p className="headline">[Headline]</p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">[n]</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat">
                <span className="stat-number">[n]</span>
                <span className="stat-label">Saved</span>
              </div>
            </div>
            <p className="bio">[Bio]</p>
            <a href="#" className="link">[Link]</a>
            <button className="edit-btn" onClick={() => navigate('/edit-profile')}>
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid-section">
          <h3 className="grid-label">Saved Artworks</h3>
          <div className="grid">
            {savedPaintings.map((painting) => (
              <div
                className="card"
                key={painting.id}
                onClick={() => setSelectedPainting(painting)}
              >
                <div className="card-image"></div>
                <div className="card-info">
                  <p className="card-title">{painting.title}</p>
                  <p className="card-artist">{painting.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPainting && (
        <div className="modal-overlay" onClick={() => setSelectedPainting(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div
                className="modal-artist-info"
                onClick={() => { setSelectedPainting(null); navigate('/artist-dashboard') }}
                style={{ cursor: 'pointer' }}
              >
                <div className="modal-avatar"></div>
                <div>
                  <p className="modal-artist-name">{selectedPainting.artist}</p>
                  <p className="modal-artist-handle">@handle</p>
                </div>
              </div>
              <div className="modal-actions">
                <button className="modal-btn">Follow</button>
                <button
                  className={`modal-btn ${isSaved ? 'saved-active' : 'save-btn-modal'}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  {isSaved ? '💾 Saved' : '💾 Save'}
                </button>
                <button className="modal-close" onClick={() => setSelectedPainting(null)}>✕</button>
              </div>
            </div>

            <TiltImage />

            <div className="modal-footer">
              <h2 className="modal-title">{selectedPainting.title}</h2>
              <p className="modal-description">[Painting description goes here]</p>
              <div className="modal-meta">
                <span>❤️ 0 Appreciations</span>
                <span>👁️ 0 Views</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}