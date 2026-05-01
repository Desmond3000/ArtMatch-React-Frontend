import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import heartEmpty from '../assets/Empty_Heart.png'
import heartFilled from '../assets/Full_Heart.png'
import saveEmpty from '../assets/Empty_bm.png'
import saveFilled from '../assets/Full_bm.png'
import { motion } from 'framer-motion' // ← only keep motion, remove the rest
import './PaintingDetail.css'

// ← TiltImage function completely removed

export default function PaintingDetail() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const painting = state?.painting

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [saveCount, setSaveCount] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const recommended = Array(4).fill(null).map((_, i) => ({
    id: i + 100,
    title: 'Similar Title',
    artist: 'Artist',
    images: [null]
  }))

  if (!painting) {
    return (
      <div className="detail-page">
        <nav className="detail-navbar">
          <Link to="/home">
            <img src={logo} alt="ArtMatch Logo" className="logo" />
          </Link>
        </nav>
        <div className="detail-not-found">
          <h2>Painting not found</h2>
          <button className="detail-back-btn" onClick={() => navigate('/home')}>
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="detail-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="detail-navbar">
        <Link to="/home">
          <img src={logo} alt="ArtMatch Logo" className="logo" />
        </Link>
        <button className="detail-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </nav>

      <div className="detail-container">

        <div className="detail-left">
          <div className="detail-image-wrapper">
            <img
              src={painting.images?.[currentImage] || null}
              alt={painting.title}
              className="detail-image"
            />
          </div>

          {painting.images?.length > 1 && (
            <div className="image-nav">
              <button
                className="image-nav-btn"
                onClick={() => setCurrentImage(i => i - 1)}
                disabled={currentImage === 0}
              >‹</button>
              <span className="image-nav-count">
                {currentImage + 1} / {painting.images.length}
              </span>
              <button
                className="image-nav-btn"
                onClick={() => setCurrentImage(i => i + 1)}
                disabled={currentImage === painting.images.length - 1}
              >›</button>
            </div>
          )}
        </div>

        <div className="detail-right">
          <div
            className="detail-artist"
            onClick={() => navigate(`/artist/${painting.artistId || 1}`)}
          >
            <div className="detail-avatar"></div>
            <div className="detail-artist-info">
              <p className="detail-artist-name">{painting.artist}</p>
              <p className="detail-artist-handle">@handle</p>
            </div>
            <button
              className={`detail-follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={(e) => { e.stopPropagation(); setIsFollowing(!isFollowing) }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          <hr className="detail-divider" />

          <div className="detail-reactions">
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

          <h1 className="detail-title">{painting.title}</h1>
          <p className="detail-description">[Painting description goes here]</p>

          <div className="detail-category">
            <span className="category-tag">[Category]</span>
          </div>
        </div>
      </div>

      <div className="detail-recommended">
        <h2 className="recommended-title">More like this</h2>
        <div className="recommended-grid">
          {recommended.map((rec) => (
            <div
              key={rec.id}
              className="card"
              onClick={() => navigate(`/paintings/${rec.id}`, { state: { painting: rec } })}
            >
              <div className="card-image"></div>
              <div className="card-info">
                <p className="card-title">{rec.title}</p>
                <p className="card-artist">{rec.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}