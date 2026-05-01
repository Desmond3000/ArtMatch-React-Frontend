import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import bgVideo from '../assets/BG.mp4'
import logo from '../assets/LOGO1.png'
import accIcon from '../assets/ACC_LOGO.png'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import './Home.css'


function TiltImage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Convert mouse position to rotation
  const rotateX = useTransform(y, [-100, 100], [6, -6])
  const rotateY = useTransform(x, [-100, 100], [-6, 6])

  // Add spring for smoothness
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

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedPainting, setSelectedPainting] = useState(null)

  // ← Read role and username saved during registration
  const role = localStorage.getItem('role')
  const username = localStorage.getItem('username') // save this during register too

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setSelectedPainting(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const paintings = Array(16).fill(null).map((_, i) => ({
    id: i,
    title: 'Title',
    artist: 'Artist',
  }))


  // ← Route to correct profile page based on role
  const handleProfileClick = () => {
    if (role === 'artist') {
      navigate('/artist-dashboard')
    } else {
      navigate('/viewer-profile')
    }
  }

  const allArtists = Array(8).fill(null).map((_, i) => ({
  id: i,
  name: `Artist ${i + 1}`,
  handle: `@artist${i + 1}`,
  headline: 'Digital Artist & Illustrator',
  }))

// Filter artists by search query
  const filteredArtists = allArtists.filter(a =>
  a.name.toLowerCase().includes(search.toLowerCase()) ||
  a.handle.toLowerCase().includes(search.toLowerCase())
  )

  const isSearching = search.trim().length > 0

  return (
    <div className="page">
      <div className="hero">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Navbar */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <Link to="/home">
            <img src={logo} alt="ArtMatch Logo" className="logo" />
          </Link>

          <div className="profile-wrapper">
            <img
              src={accIcon}
              alt="Profile"
              className="profile-icon"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <img src={accIcon} className="dropdown-avatar" />
                  <div>
                    {/* ← Now shows real values from localStorage */}
                    <p className="dropdown-name">{username || 'Name'}</p>
                    <p className="dropdown-role">{role === 'artist' ? 'Artist' : 'Viewer'}</p>
                  </div>
                </div>
                <hr />
                {/* ← Routes to correct profile based on role */}
                <p className="dropdown-item" onClick={handleProfileClick}>Profile</p>
                <p className="dropdown-item" onClick={() => navigate('/edit-profile')}>Settings</p>
                <p className="dropdown-item" onClick={() => {
                  localStorage.clear() // ← clears role + token on sign out
                  navigate('/')
                }}>Sign Out</p>
              </div>
            )}
          </div>
        </nav>

        {/* Header */}
        <div className="header">
          <h1 className="brand">ArtMatch</h1>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <p className="section-title">Recommended for you</p>
        </div>
      </div>

      {/* Search Results — shows profiles */}
{isSearching ? (
  <div className="search-results">
    <p className="results-label">Results for "{search}"</p>
    {filteredArtists.length === 0 ? (
      <p className="no-results">No artists found.</p>
    ) : (
      <div className="artist-list">
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            className="artist-card"
            onClick={() => navigate('/artist-dashboard')}
          >
            <div className="artist-card-avatar"></div>
            <div className="artist-card-info">
              <p className="artist-card-name">{artist.name}</p>
              <p className="artist-card-handle">{artist.handle}</p>
              <p className="artist-card-headline">{artist.headline}</p>
            </div>
            <button className="artist-follow-btn">Follow</button>
          </div>
        ))}
      </div>
    )}
  </div>
) : (
  /* Normal Painting Grid */
  <div className="grid">
    {paintings.map((painting) => (
      <div
        key={painting.id}
        className="card"
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
)}

      {/* ← Only artists see the + button */}
      {role === 'artist' && (
        <button className="fab" onClick={() => navigate('/post')}>+</button>
      )}

      {selectedPainting && (
        <div className="modal-overlay" onClick={() => setSelectedPainting(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            {/* Top bar */}
            <div className="modal-header">
              <div className="modal-artist-info"
              onClick={() => {setSelectedPainting(null)       // close the modal first
              navigate('/artist-dashboard')
              }}
              style={{cursor: 'pointer'}}>
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

            {/* Image */}
              <TiltImage />

            {/* Bottom info */}
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