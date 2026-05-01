import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import './EditProfile.css'

export default function EditProfile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('basic')

  // Basic Info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [headline, setHeadline] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [links, setLinks] = useState([
    { title: '', url: '' },
    { title: '', url: '' }
  ])

  // Security
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const updateLink = (index, field, value) => {
    const updated = [...links]
    updated[index][field] = value
    setLinks(updated)
  }

  const saveBasicInfo = () => {
    console.log('Saving basic info...')
    // API call goes here later
  }

  const saveSecurityInfo = () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match!')
      return
    }
    setErrorMessage('')
    console.log('Saving security info...')
    // API call goes here later
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

      <div className="edit-container">
        <h1 className="title">Profile</h1>

        <div className="content">
          {/* Sidebar */}
          <div className="sidebar">
            <button
              className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Information
            </button>
            <button
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Account & Security
            </button>
          </div>

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="form-section">
              <div className="avatar-section">
                <img src={accLogo} className="avatar" alt="Avatar" />
                <p className="replace-link">/ Replace</p>
              </div>

              <div className="fields">
                <div className="row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-group full">
                  <label>Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="input select"
                  >
                    <option value="">Select Role</option>
                    <option value="artist">Artist</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>About me</label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="textarea"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Links */}
                <div className="form-group full">
                  <label>LINKS</label>
                  <div className="links-table">
                    <div className="links-header">
                      <span>Title</span>
                      <span>URL</span>
                      <span></span>
                    </div>
                    {links.map((link, index) => (
                      <div className="link-row" key={index}>
                        <input
                          type="text"
                          value={link.title}
                          onChange={e => updateLink(index, 'title', e.target.value)}
                          placeholder="Title"
                          className="input link-input"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={e => updateLink(index, 'url', e.target.value)}
                          placeholder="URL"
                          className="input link-input"
                        />
                        <button className="add-btn">Add</button>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="save-btn" onClick={saveBasicInfo}>Save Changes</button>
              </div>
            </div>
          )}

          {/* Account & Security Tab */}
          {activeTab === 'security' && (
            <div className="form-section">
              <div className="fields">
                <div className="form-group full">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group full">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="input"
                  />
                </div>

                <hr className="divider" />
                <p className="section-label">Change Password</p>

                <div className="form-group full">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group full">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="form-group full">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    className="input"
                  />
                </div>

                {errorMessage && <p className="error-txt">{errorMessage}</p>}

                <button className="save-btn" onClick={saveSecurityInfo}>Save Changes</button>

                <hr className="divider" />
                <button className="delete-btn">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}