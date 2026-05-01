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

const paintings = Array(12).fill(null).map((_, i) => ({
  id: i,
  title: 'Title',
  artist: 'Artist',
  images: [null, null, null]
}))

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

export default function ArtistDashboard() {
  const navigate = useNavigate()
  const [selectedPainting, setSelectedPainting] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [saveCount, setSaveCount] = useState(0)
  const [activeTab, setActiveTab] = useState('mywork')
  const [currentImage, setCurrentImage] = useState(0)
  const savedPaintings = Array(8).fill(null).map((_, i) => ({
  id: i + 100,
  title: 'Saved Title',
  artist: 'Other Artist',
  }))

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
          {/* Tabs */}
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
            onClick={() => {setSelectedPainting(painting); setCurrentImage(0)}}
            >
            <div className="card-image"></div>
              <div className="card-info">
              <p className="card-title">{painting.title}</p>
              {activeTab === 'saved' && (
              <p className="card-artist">{painting.artist}</p>
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

            <div className="model-image-wrapper">
              <TiltImage />
              {selectedPainting.images?.length > 1 && (
                <div className="image-nav">
                  <button
                  className='image-nav-btn'
                  onClick={() => setCurrentImage(i => i - 1)}
                  disabled={currentImage === 0}>‹</button>
                  <span className='image-nav-count'>
                    {currentImage + 1} / {selectedPainting.images.length}
                  </span>
                  <button
                  className='image-nav-btn'
                  onClick={() => setCurrentImage(i => i + 1)}
                  disabled={currentImage === selectedPainting.images.length - 1}>›</button>
                </div>
              )}
              </div>

            <div className="modal-footer">
              <div className="modal-reactions">
                <button
                  className="icon-btn"
                  onClick={() => {
                    setIsLiked(!isLiked)
                    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
                  }}
                >
                  <img src={isLiked ? heartFilled : heartEmpty} alt="like" className="reaction-icon" />
                  <span>{likeCount}</span>
                </button>

                <button
                  className="icon-btn"
                  onClick={() => {
                    setIsSaved(!isSaved)
                    setSaveCount(isSaved ? saveCount - 1 : saveCount + 1)
                  }}
                >
                  <img src={isSaved ? saveFilled : saveEmpty} alt="save" className="reaction-icon" />
                  <span>{saveCount}</span>
                </button>
              </div>

              <h2 className="modal-title">{selectedPainting.title}</h2>
              <p className="modal-description">[Painting description goes here]</p>
              <div className="modal-meta">
                <span>👁️ 0 Views</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}