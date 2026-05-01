import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import './ArtistDashboard.css'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

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

// Dummy data — replace with API call using the id later
const dummyArtist = {
  id: 1,
  name: 'Maria Santos',
  handle: '@mariasantos',
  headline: 'Digital Artist & Illustrator',
  bio: 'I paint sunsets and dreams.',
  link: 'mariasantos.com',
  following: 20,
  followers: 150,
  appreciations: 42,
}

const dummyPaintings = Array(12).fill(null).map((_, i) => ({
  id: i,
  title: 'Title',
  artist: dummyArtist.name,
  images: [null, null, null]
}))

export default function ArtistProfile() {
  const { id } = useParams() // ← gets the artist id from the URL
  const navigate = useNavigate()
  const [isFollowing, setIsFollowing] = useState(false)
  const [selectedPainting, setSelectedPainting] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)

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
            <h2 className="username">{dummyArtist.name}</h2>
            <p className="headline">{dummyArtist.headline}</p>

            <div className="stats">
              <div className="stat">
                <span className="stat-number">{dummyArtist.following}</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat">
                <span className="stat-number">{dummyArtist.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-number">{dummyArtist.appreciations}</span>
                <span className="stat-label">Appreciations</span>
              </div>
            </div>

            <p className="bio">{dummyArtist.bio}</p>
            <a href="#" className="link">{dummyArtist.link}</a>

            {/* ← Follow button instead of Edit Profile */}
            <button
              className="edit-btn"
              onClick={() => setIsFollowing(!isFollowing)}
              style={{ background: isFollowing ? '#888' : '' }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        <div className="grid-section">
          <div className="grid">
            {dummyPaintings.map((painting) => (
              <div
                className="card"
                key={painting.id}
                onClick={() => { setSelectedPainting(painting); setCurrentImage(0) }}
              >
                <div className="card-image"></div>
                <div className="card-info">
                  <p className="card-title">{painting.title}</p>
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
              <div className="modal-artist-info">
                <div className="modal-avatar"></div>
                <div>
                  <p className="modal-artist-name">{dummyArtist.name}</p>
                  <p className="modal-artist-handle">{dummyArtist.handle}</p>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="modal-btn"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
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
              <h2 className="modal-title">{selectedPainting.title}</h2>
              <p className="modal-description">[Painting description]</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}