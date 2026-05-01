import { Link } from 'react-router-dom'
import bgVideo from '../assets/BG.mp4'
import logo from '../assets/LOGO1.png'
import AvatarGroup from '../components/AvatarGroup'
import './Landing.css'
import useSound from 'use-sound';
import sfx from '../assets/sfx.wav'
import { motion } from 'framer-motion'


export default function Landing() {
  const [playLogin] = useSound(sfx, { volume: 0.6 });
  const [playReg] = useSound(sfx, { volume: 0.6 }); 
  return (
    <motion.div className="page"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity:0 }}
     transition={{ duration:0.3 }}>
    <div className="page">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <img src={logo} alt="ArtMatch Logo" className="logo" />

      <div className="container">
        <h1 className="brand">ArtMatch</h1>
        <p className="tagline">Discover. Connect. Collect.</p>

        <Link to="/login">
          <button class = 'btn' onMouseDown={playLogin}>LOGIN</button>
        </Link>

        <Link to="/role-select">
          <button class = 'btn' onMouseDown={playReg}>REGISTER</button>
        </Link>

        {/* Avatar Group */}
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontFamily: 'JosefinSans', fontSize: '0.85rem', color: '#1a1a2e', fontWeight: 600 }}>
            Join the community
          </p>
          <AvatarGroup />
        </div>
      </div>
    </div>
    </motion.div>
  )
}