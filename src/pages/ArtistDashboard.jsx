import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import './ArtistDashboard.css'

const paintings = Array(12).fill({ title: 'Title', artist: 'Artist' })

export default function ArtistDashboard() {
  const navigate = useNavigate()

  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/home">
          <img src={logo} alt="ArtMatch Logo" className="logo" />
        </Link>
        <img src={accLogo} alt="Profile" className="profile-icon" />
      </nav>

      <div className="dashboard">
        {/* Profile Section */}
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

        {/* Paintings Grid */}
        <div className="grid-section">
          <div className="grid">
            {paintings.map((painting, index) => (
              <div className="card" key={index}>
                <div className="card-image"></div>
                <div className="card-info">
                  <p className="card-title">{painting.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}