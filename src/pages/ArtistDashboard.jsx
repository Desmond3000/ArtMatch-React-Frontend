//This is the artist's (owner) view of their profile

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import heartEmpty from '../assets/Empty_Heart.png'
import heartFilled from '../assets/Full_Heart.png'
import saveEmpty from '../assets/Empty_bm.png'
import saveFilled from '../assets/Full_bm.png'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import './ArtistDashboard.css'
import { useApp } from '../context/AppContext'

// ── TiltImage OUTSIDE the main component ──
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

// ── Single export ──
export default function ArtistDashboard() {
  const navigate = useNavigate()
  const { interactions, setInteractions, paintings, setPaintings } = useApp()
  const [selectedPainting, setSelectedPainting] = useState(null)
  const [activeTab, setActiveTab] = useState('mywork')
  const [currentImage, setCurrentImage] = useState(0)

  const savedPaintings = Array(8).fill(null).map((_, i) => ({
    id: i + 100,
    title: 'Saved Title',
    artist: 'Other Artist',
  }))

  const currentInteraction = selectedPainting
    ? interactions[selectedPainting.id] || { liked: false, likeCount: 0, saved: false, saveCount: 0 }
    : null

  return (
    <div className="page">
      <nav className="navbar">
        <Link to="/paintings">
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
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-number">[n]</span>
                <span className="stat-label">Appreciations</span>
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
          <div className="dashboard-tabs">
            <button
              className={`dashboard-tab ${activeTab === 'mywork' ? 'active' : ''}`}
              onClick={() => setActiveTab('mywork')}
            >
              My Artworks
            </button>
            <button
              className={`dashboard-tab ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              Saved
            </button>
          </div>

          <div className="grid">
            {(activeTab === 'mywork' ? paintings : savedPaintings).map((painting) => (
                          <div
              className="card"
              key={painting.id}
              onClick={() => { setSelectedPainting(painting); setCurrentImage(0) }}
            >
              <div className="card-image-wrapper">
                <img src={painting.images?.[0]} alt={painting.title} className="card-image" />
              </div>
              <div className="card-info">
                <p className="card-title">{painting.title}</p>
                {activeTab === 'saved' && (
                  <p className="card-artist">{painting.artist}</p>
                )}
                {activeTab === 'mywork' && (
                  <div className="card-actions" onClick={e => e.stopPropagation()}>
                    <button
                      className="edit-painting-btn"
                      onClick={() => navigate('/edit-painting', { state: { painting } })}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setPaintings(prev => prev.filter(p => p.id !== painting.id))}
                    >
                      Delete
                    </button>
                  </div>
                )}
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
                <button className="modal-close" onClick={() => setSelectedPainting(null)}>✕</button>
              </div>
            </div>

            <div
              className="modal-image-wrapper"
              onClick={() => {
                setSelectedPainting(null)
                navigate(`/paintings/${selectedPainting.id}`, { state: { painting: selectedPainting } })
              }}
              style={{ cursor: 'pointer' }}
            >
              <TiltImage />

              {selectedPainting.images?.length > 1 && (
                <div className="image-nav">
                  <button
                    className="image-nav-btn"
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(i => i - 1) }}
                    disabled={currentImage === 0}
                  >‹</button>
                  <span className="image-nav-count">
                    {currentImage + 1} / {selectedPainting.images.length}
                  </span>
                  <button
                    className="image-nav-btn"
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(i => i + 1) }}
                    disabled={currentImage === selectedPainting.images.length - 1}
                  >›</button>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <div className="modal-reactions">
                <button
                  className="icon-btn"
                  onClick={() => {
                    const id = selectedPainting.id
                    setInteractions(prev => {
                      const curr = prev[id] || { liked: false, likeCount: 0, saved: false, saveCount: 0 }
                      return {
                        ...prev,
                        [id]: {
                          ...curr,
                          liked: !curr.liked,
                          likeCount: curr.liked ? curr.likeCount - 1 : curr.likeCount + 1
                        }
                      }
                    })
                  }}
                >
                  <img
                    src={currentInteraction.liked ? heartFilled : heartEmpty}
                    alt="like"
                    className="reaction-icon"
                  />
                  <span>{currentInteraction.likeCount}</span>
                </button>

                <button
                  className="icon-btn"
                  onClick={() => {
                    const id = selectedPainting.id
                    setInteractions(prev => {
                      const curr = prev[id] || { liked: false, likeCount: 0, saved: false, saveCount: 0 }
                      return {
                        ...prev,
                        [id]: {
                          ...curr,
                          saved: !curr.saved,
                          saveCount: curr.saved ? curr.saveCount - 1 : curr.saveCount + 1
                        }
                      }
                    })
                  }}
                >
                  <img
                    src={currentInteraction.saved ? saveFilled : saveEmpty}
                    alt="save"
                    className="reaction-icon"
                  />
                  <span>{currentInteraction.saveCount}</span>
                </button>
              </div>

              <h2 className="modal-title">{selectedPainting.title}</h2>
              <p className="modal-description">[Painting description goes here]</p>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
