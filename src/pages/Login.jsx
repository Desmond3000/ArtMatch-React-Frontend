import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import bgVideo from '../assets/BG.mp4'
import logo from '../assets/LOGO1.png'
import accIcon from '../assets/ACC_LOGO.png'
import pwIcon from '../assets/PW_LOGO.png'
import './Login.css'
import { motion } from 'framer-motion'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const login = () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields')
      return
    }
    // TODO: connect to real API later
    navigate('/paintings')
  }

  return (
    <motion.div
     className='page'
     initial={{ opacity: 0 }}
     animate={{opacity: 1}}
     exit={{opacity:0}}
     transition={{ duration:0.3}}>
    <div className="page">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <img src={logo} alt="ArtMatch Logo" className="logo" />

      <div className="container">
        <div className="glass-panel">
          <h1 className="title">LOGIN</h1>

          {errorMessage && <p className="error-txt">{errorMessage}</p>}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <img src={accIcon} className="icon" />
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <img src={pwIcon} className="icon" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="forgot">Forgot Password</p>
          </div>

          <button className="btn" onClick={login}>LOGIN</button>
          <p className="register-link">
            <Link to="/role-select">Create New Account</Link>
          </p>
        </div>
      </div>
    </div>
    </motion.div>
  )
}

