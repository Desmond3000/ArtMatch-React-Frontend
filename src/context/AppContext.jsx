import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [interactions, setInteractions] = useState({})
  const [followedArtists, setFollowedArtists] = useState([])
  const [savedPaintings, setSavedPaintings] = useState([])
  const [paintings, setPaintings] = useState([])

  return (
    <AppContext.Provider value={{
      interactions, setInteractions,
      followedArtists, setFollowedArtists,
      savedPaintings, setSavedPaintings,
      paintings, setPaintings
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)