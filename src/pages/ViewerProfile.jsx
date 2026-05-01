import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import './ArtistDashboard.css'

const savedPaintings = Array(12).fill(null).map((_, i) => ({
  id: i,
  title: 'Title',
  artist: 'Artist',
}))

export default function ViewerProfile() {
  const navigate = useNavigate()
  const [selectedPainting, setSelectedPainting] = useState(null) // ← was missing

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
                onClick={() => setSelectedPainting(painting)} // ← fixed
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

      {/* Modal — moved outside dashboard div */}
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
                <button className="modal-btn save-btn-modal">💾 Save</button>
                <button className="modal-close" onClick={() => setSelectedPainting(null)}>✕</button>
              </div>
            </div>

            <div className="modal-image"></div>

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