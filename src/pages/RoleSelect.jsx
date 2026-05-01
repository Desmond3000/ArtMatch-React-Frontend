import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authAPI } from '../api/index'
import bgVideo from '../assets/BG.mp4'
import logo from '../assets/LOGO1.png'
import './RoleSelect.css'

export default function RoleSelect() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const handleSelect = async (role) => {
    try {
      const response = await authAPI.register({ ...state, role })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', role)
      localStorage.setItem('username', state.username)
      navigate('/home')
    } catch (err) {
      navigate('/register')
    }
  }

  return (
    <motion.div
      className="role-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <img src={logo} alt="ArtMatch Logo" className="logo" />

      <div className="role-container">
        <h1 className="role-title">Join As</h1>
        <p className="role-subtitle">Choose how you want to use ArtMatch</p>

        <div className="role-cards">
          <motion.div
            className="role-card"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('viewer')}
          >
            <div className="role-icon">👁️</div>
            <h2>Viewer</h2>
            <p>Discover and appreciate artworks from talented artists around Bicol.</p>
            <ul className="role-perks">
              <li>✓ Browse artwork</li>
              <li>✓ Follow artists</li>
              <li className="perk-no">✗ Post artwork</li>
            </ul>
            <button className="role-btn viewer-btn">Continue as Viewer</button>
          </motion.div>

          <motion.div
            className="role-card featured"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('artist')}
          >
            <div className="role-icon">🎨</div>
            <h2>Artist</h2>
            <p>Share your artwork, grow your audience, and connect with other creatives.</p>
            <ul className="role-perks">
              <li>✓ Browse artwork</li>
              <li>✓ Follow artists</li>
              <li>✓ Post artwork</li>
            </ul>
            <button className="role-btn artist-btn">Continue as Artist</button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}