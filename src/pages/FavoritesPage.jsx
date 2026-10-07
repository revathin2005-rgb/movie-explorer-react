import { ArrowLeft, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  return (
    <main className="favorites-page page-container">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to discover</Link>
      <div className="section-intro favorites-heading">
        <div><span className="section-kicker"><Heart size={14} /> YOUR PERSONAL COLLECTION</span><h1>My list</h1><p>All the films you’ve saved for later.</p></div>
        <span className="results-label">{favorites.length} SAVED</span>
      </div>
      {favorites.length
        ? <MovieGrid movies={favorites} />
        : <div className="empty-state"><span className="empty-icon"><Heart size={23} /></span><h3>Your list is waiting</h3><p>Save movies you love and they’ll be right here.</p><Link className="text-button" to="/">Explore movies <span aria-hidden="true">→</span></Link></div>}
    </main>
  )
}
