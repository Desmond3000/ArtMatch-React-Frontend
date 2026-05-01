import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import bgVideo from '../assets/BG.mp4'
import logo from '../assets/LOGO1.png'
import accLogo from '../assets/ACC_LOGO.png'
import pwLogo from '../assets/PW_LOGO.png'
import './Register.css'

export default function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async () => {
  if (!username || !email || !password || !confirmPassword) {
    setErrorMessage('Fill in all fields')
    return
  }
  if (password !== confirmPassword) {
    setErrorMessage('Passwords do not match!')
    return
  }

  navigate('/role-select', { state: { username, email, password } })
}

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <img src={logo} alt="ArtMatch Logo" className="logo" />

      <div className="container">
        <div className="glass-panel">
          <h1 className="title">SIGN UP</h1>

          {errorMessage && <p className="error-txt">{errorMessage}</p>}

          <div className="form-group">
            <label>Username</label>
            <div className="input-wrapper">
              <img src={accLogo} className="icon" alt="" />
              <input
                type="text"
                placeholder="Create Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <img src={accLogo} className="icon" alt="" />
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <img src={pwLogo} className="icon" alt="" />
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <img src={pwLogo} className="icon" alt="" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn" onClick={handleRegister}>SIGN UP</button>

          <p className="register-link">
            <Link to="/login">Already Have an Account</Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}