import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import imageLogo from '../assets/Image-logo.png'
import textLogo from '../assets/Text-Logo.png'
import urlLogo from '../assets/URL-Logo.png'
import divLogo from '../assets/Div-Logo.png'
import './Post.css'

export default function Post() {
  const navigate = useNavigate()
  const imageInputRef = useRef(null)

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [coverImage, setCoverImage] = useState(null)

  const triggerImageUpload = () => {
    imageInputRef.current.click()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverImage(URL.createObjectURL(file))
    }
  }

  const submitPost = () => {
    if (!title) {
      alert('Title is required!')
      return
    }
    console.log('Posting:', title, tags, coverImage)
    // API call goes here later
    navigate('/artist-dashboard')
  }

  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/home">
          <img src={logo} alt="ArtMatch Logo" className="logo" />
        </Link>
        <img src={accLogo} alt="Profile" className="profile-icon" />
      </nav>

      <div className="post-container">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="tool-item">
            <img src={imageLogo} className="tool-icon-img" alt="Add Image" />
            <p className="tool-label">Add Image</p>
          </div>

          <div className="tool-item">
            <img src={textLogo} className="tool-icon-img" alt="Add Text" />
            <p className="tool-label">Add Text</p>
          </div>

          <div className="tool-item">
            <img src={urlLogo} className="tool-icon-img" alt="Add Link" />
            <p className="tool-label">Add Link</p>
          </div>

          <div className="tool-item">
            <img src={divLogo} className="tool-icon-img" alt="Add Division" />
            <p className="tool-label">Add Division</p>
          </div>
        </div>

        {/* Project Cover */}
        <div className="cover-section">
          <p className="cover-label">Project Cover</p>
          <div className="cover-box" onClick={triggerImageUpload}>
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            {coverImage ? (
              <img src={coverImage} className="cover-preview" alt="Cover" />
            ) : (
              <div className="cover-placeholder">
                <span>✥</span>
                <p className="cover-title">Title</p>
                <p className="cover-artist">Artist</p>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="form-group">
          <label>Title <span className="required">(Required)</span></label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="input"
          />
        </div>

        <button className="btn" onClick={submitPost}>Post</button>
      </div>
    </div>
  )
}