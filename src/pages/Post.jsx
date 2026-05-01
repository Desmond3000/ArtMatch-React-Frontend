import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import imageLogo from '../assets/Image-logo.png'
import './Post.css'

export default function Post() {
  const navigate = useNavigate()
  const imageInputRef = useRef(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('') // ← new
  const [category, setCategory] = useState('')       // ← new
  const [tags, setTags] = useState('')
  const [coverImage, setCoverImage] = useState(null)

  const triggerImageUpload = () => imageInputRef.current.click()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) setCoverImage(URL.createObjectURL(file))
  }

  const submitPost = () => {
    if (!title) {
      alert('Title is required!')
      return
    }
    if (!coverImage) {
      alert('Please upload an image!')
      return
    }
    console.log('Posting:', { title, description, category, tags, coverImage })
    // API call goes here later
    navigate('/artist-dashboard')
  }

  return (
    <div className="page">
      <nav className="navbar">
        <Link to="/home">
          <img src={logo} alt="ArtMatch Logo" className="logo" />
        </Link>
        <img src={accLogo} alt="Profile" className="profile-icon" />
      </nav>

      <div className="post-container">
        {/* Toolbar */}
        <div className="toolbar">
          <div className="tool-item" onClick={triggerImageUpload}>
            <img src={imageLogo} className="tool-icon-img" alt="Add Image" />
            <p className="tool-label">Add Image</p>
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

        {/* Title */}
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

        {/* Description ← new */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Describe your artwork..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="input textarea"
          />
        </div>

        {/* Category ← new */}
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input select"
          >
            <option value="">Select Category</option>
            <option value="painting">Painting</option>
            <option value="digital">Digital Art</option>
            <option value="sculpture">Sculpture</option>
            <option value="photography">Photography</option>
            <option value="illustration">Illustration</option>
            <option value="mixed-media">Mixed Media</option>
            <option value="watercolor">Watercolor</option>
            <option value="oil">Oil Paint</option>
            <option value="sketch">Sketch & Drawing</option>
          </select>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            placeholder="e.g. abstract, colorful, nature"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="input"
          />
          <p className="input-hint">Separate tags with commas</p>
        </div>

        <button className="btn" onClick={submitPost}>Post</button>
      </div>
    </div>
  )
}