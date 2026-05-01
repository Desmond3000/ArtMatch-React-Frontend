import { motion } from 'framer-motion'
import avatar4 from '../assets/Kurt.png'
const avatars = [
  { name: 'Jorge Creiann A. Jarme', img: null },
  { name: 'Clara Jhoanne C. Oguan', img: null },
  { name: 'Joseph Aaron T. Velarde', img: null },
  { name: 'Kurt Desmond G. Rosana', img: avatar4 },
]

export default function AvatarGroup() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {avatars.map((avatar, index) => (
        <motion.div
          key={index}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: '#1a1a2e',
            border: '2px solid white',
            marginLeft: index === 0 ? 0 : -12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            position: 'relative',
            zIndex: index,
            overflow: 'hidden',
          }}
          whileHover={{ 
            y: -8, 
            zIndex: 99,
            transition: { duration: 0.2 }
          }}
          title={avatar.name}
        >
          {avatar.img 
            ? <img src={avatar.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : avatar.name[0]
          }
        </motion.div>
      ))}
    </div>
  )
}