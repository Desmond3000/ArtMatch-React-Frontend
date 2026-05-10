import { motion } from 'framer-motion'
import avatar4 from '../assets/Kurt.png'
import avatar1 from '../assets/Jorge.webp'
import avatar2 from '../assets/Clara.webp'
import avatar3 from '../assets/Joseph.webp'

const avatars = [
  { name: 'Jorge Creiann A. Jarme', img: avatar1 },
  { name: 'Clara Jhoanne C. Oguan', img: avatar2 },
  { name: 'Joseph Aaron T. Velarde', img: avatar3 },
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