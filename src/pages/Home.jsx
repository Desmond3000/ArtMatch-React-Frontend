import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import bgVideo from '../assets/BG.mp4'
import logo from '../assets/LOGO1.png'
import accIcon from '../assets/ACC_LOGO.png'
import heartEmpty from '../assets/Empty_Heart.png'
import heartFilled from '../assets/Full_Heart.png'
import saveEmpty from '../assets/Empty_bm.png'
import saveFilled from '../assets/Full_bm.png'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import './Home.css'

function TiltImage({src}) {
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
      <motion.img
        src={src}
        alt="painting"
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
  const [interactions, setInteractions] = useState({})
  const [currentImage, setCurrentImage] = useState(0)
  const [filters, setFilters] = useState({ style: '', theme: '', artist: '' })
  const [filterMode, setFilterMode] = useState('all') // all | 'artists' | 'styles' | 'themes'  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  
  const role = localStorage.getItem('role')
  const username = localStorage.getItem('username')

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

  const allArtists = [
    { id: 0, name: 'Maria Santos',   handle: '@mariasantos',  headline: 'Digital Artist & Illustrator' },
    { id: 1, name: 'Juan dela Cruz', handle: '@juandc',       headline: 'Oil Painter & Muralist' },
    { id: 2, name: 'Lena Park',      handle: '@lenapark',     headline: 'Watercolor & Concept Art' },
    { id: 3, name: 'Carlos Reyes',   handle: '@carlosreyes',  headline: 'Sculptor & Mixed Media' },
    { id: 4, name: 'Anika Torres',   handle: '@anikat',       headline: 'Street Art & Graffiti' },
    { id: 5, name: 'Ben Villanueva', handle: '@benv',         headline: 'Portrait & Character Design' },
    { id: 6, name: 'Sofia Mendoza',  handle: '@sofiamendoza', headline: 'Abstract & Expressionism' },
    { id: 7, name: 'Rico Tan',       handle: '@ricotan',      headline: 'Photography & Digital Art' },
  ]

  const styles = ['watercolor', 'digital', 'oil', 'sketch']
  const themes = ['nature', 'urban', 'portrait', 'abstract']

  const paintings = Array(32).fill(null).map((_, i) => ({
  id: i,
  title: 'Title',
  artist: allArtists[i % allArtists.length].name,
  style: styles[i % styles.length],
  theme: themes[i % themes.length],
  images: [
    'https://picsum.photos/400/300?random=' + i,
    'https://picsum.photos/400/300?random=' + (i + 20),
    'https://picsum.photos/400/300?random=' + (i + 40)
  ]
  }))

  const isSearching = search.trim().length > 0


  // ← filteredByCategory declared AFTER paintings
  const filtered = paintings.filter(p => {
  if (filterMode === 'styles' && isSearching)
    return p.style?.toLowerCase().includes(search.toLowerCase())
  if (filterMode === 'themes' && isSearching)
    return p.theme?.toLowerCase().includes(search.toLowerCase())
  return true
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const filteredArtists = allArtists.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.handle.toLowerCase().includes(search.toLowerCase())
  )

  const filteredPaintings = paintings.filter(p => {
  if (filterMode === 'styles')
    return p.style?.toLowerCase().includes(search.toLowerCase())
  if (filterMode === 'themes')
    return p.theme?.toLowerCase().includes(search.toLowerCase())
  return (
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.artist.toLowerCase().includes(search.toLowerCase())
  )
  })


  const handleProfileClick = () => {
    if (role === 'artist') navigate('/artist-dashboard')
    else if (role === 'admin') navigate('/admin')
    else navigate('/viewer-profile')
  }

  const handleFilterChange = (key, value) => {
  setFilters(prev => ({ ...prev, [key]: value }))
  setCurrentPage(1)
  }

    const currentInteraction = selectedPainting
      ? interactions[selectedPainting.id] || {
          liked: false,
          likeCount: 0,
          saved: false,
          saveCount: 0
        }
      : null

  return (
  <div className="page">
    <div className="hero">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/paintings">
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
                  <p className="dropdown-name">{username || 'Name'}</p>
                  <p className="dropdown-role">{role === 'artist' ? 'Artist' : 'Viewer'}</p>
                </div>
              </div>
              <hr />
              <p className="dropdown-item" onClick={handleProfileClick}>Profile</p>
              <p className="dropdown-item" onClick={() => navigate('/edit-profile')}>Settings</p>
              <p className="dropdown-item" onClick={() => { localStorage.clear(); navigate('/') }}>Sign Out</p>
            </div>
          )}
        </div>
      </nav>

      <div className="header">
        <h1 className="brand">ArtMatch</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={
              filterMode === 'artists' ? 'Search artists...' :
              filterMode === 'styles'  ? 'Search by style (e.g. Watercolor, Digital)...' :
              filterMode === 'themes'  ? 'Search by theme (e.g. Nature, Urban)...' :
              'Search artists or artworks'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
        <button
          className={`filter-btn ${filterMode === 'artists' ? 'filter-btn-active' : ''}`}
          onClick={() => { setFilterMode(filterMode === 'artists' ? null : 'artists'); setCurrentPage(1) }}
        >
          Artists
        </button>
        <button
          className={`filter-btn ${filterMode === 'styles' ? 'filter-btn-active' : ''}`}
          onClick={() => { setFilterMode(filterMode === 'styles' ? null : 'styles'); setCurrentPage(1) }}
        >
          Styles
        </button>
        <button
          className={`filter-btn ${filterMode === 'themes' ? 'filter-btn-active' : ''}`}
          onClick={() => { setFilterMode(filterMode === 'themes' ? null : 'themes'); setCurrentPage(1) }}
        >
          Themes
        </button>
      </div>


        <p className="section-title">Recommended for you</p>
      </div>
    </div>

    {isSearching ? (
  // when searching and filterMode is 'artists', only show artists
  <div className="search-results">
    <p className="results-label">Results for "{search}"</p>

    {filterMode === 'artists' ? (
      <>
        {filteredArtists.length > 0 ? (
          <div className="artist-list">
            {filteredArtists.map((artist) => (
              <div key={artist.id} className="artist-card" onClick={() => navigate(`/artist/${artist.id}`)}>
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
        ) : (
          <p className="no-results">No artists found.</p>
        )}
      </>
    ) : (
      <>
        {filteredArtists.length > 0 && (
          <>
            <p className="search-section-label">Artists</p>
            <div className="artist-list">
              {filteredArtists.map((artist) => (
                <div key={artist.id} className="artist-card" onClick={() => navigate(`/artist/${artist.id}`)}>
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
          </>
        )}
        {filteredPaintings.length > 0 && (
          <>
            <p className="search-section-label">Artworks</p>
            <div className="grid">
              {filteredPaintings.map((painting) => (
                <div key={painting.id} className="card" onClick={() => { setSelectedPainting(painting); setCurrentImage(0) }}>
                  <img src={painting.images[0]} className="card-image" />
                  <div className="card-info">
                    <p className="card-title">{painting.title}</p>
                    <p className="card-artist">{painting.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {filteredArtists.length === 0 && filteredPaintings.length === 0 && (
          <p className="no-results">No results found.</p>
        )}
      </>
    )}
  </div>

) : filterMode === 'artists' ? (
  <div className="search-results">
    <div className="artist-list">
      {allArtists.map((artist) => (
        <div key={artist.id} className="artist-card" onClick={() => navigate(`/artist/${artist.id}`)}>
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
  </div>

) : (
  <>
    <div className="grid">
      {paginated.map((painting) => (
        <div key={painting.id} className="card" onClick={() => { setSelectedPainting(painting); setCurrentImage(0) }}>
          <div className="card-image-wrapper">
            <img src={painting.images[0]} alt="painting" className="card-image" />
          </div>
          <div className="card-info">
            <p className="card-title">{painting.title}</p>
            <p className="card-artist">{painting.artist}</p>
          </div>
        </div>
      ))}
    </div>
    {totalPages > 1 && (
      <div className="pagination">
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>‹</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={currentPage === i + 1 ? 'page-active' : ''} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>›</button>
      </div>
    )}
  </>
)}

    {role === 'artist' && (
      <button className="fab" onClick={() => navigate('/post')}>+</button>
    )}

    {selectedPainting && (
      <div className="modal-overlay" onClick={() => setSelectedPainting(null)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>

          <div className="modal-header">
            <div
              className="modal-artist-info"
              onClick={() => { setSelectedPainting(null); navigate(`/artist/${selectedPainting.artistId || 1}`) }}
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
              setTimeout(() => {
                navigate(`/paintings/${selectedPainting.id}`, { state: { painting: selectedPainting } })
              }, 200)
            }}
            style={{ cursor: 'pointer' }}
          >
            <TiltImage src={selectedPainting.images?.[currentImage]}/>

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
                    const curr = prev[id] || {
                      liked: false,
                      likeCount: 0,
                      saved: false,
                      saveCount: 0
                    }

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
                    const curr = prev[id] || {
                      liked: false,
                      likeCount: 0,
                      saved: false,
                      saveCount: 0
                    }

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
            <p className="modal-description">[Painting description]</p>
          </div>

        </div>
      </div>
    )}
  </div>
) }