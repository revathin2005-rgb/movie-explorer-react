import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem('cinescope-favorites') || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    localStorage.setItem('cinescope-favorites', JSON.stringify(favorites))
  }, [favorites])

  const value = useMemo(() => ({
    favorites,
    isFavorite: (id) => favorites.some((movie) => movie.id === id),
    toggleFavorite: (movie) => setFavorites((current) => (
      current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie]
    )),
  }), [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
