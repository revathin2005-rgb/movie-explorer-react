import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IMAGE_BASE } from '../api/tmdb.js'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const poster = movie.poster_path ? `${IMAGE_BASE}/w500${movie.poster_path}` : null
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'Year unknown'

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="poster-link" aria-label={`View details for ${movie.title || movie.name || 'Untitled movie'}`}>
        <div className="poster-wrap">
          {poster
            ? <img className="movie-poster" src={poster} alt={`${movie.title || movie.name} poster`} loading="lazy" />
            : <div className="poster-placeholder"><span>NO<br />POSTER</span></div>}
          <div className="poster-shade" />
          <span className="rating-pill"><Star size={13} fill="currentColor" /> {Number.isFinite(movie.vote_average) && movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'NR'}</span>
        </div>
      </Link>
      <button
        type="button"
        className={`favorite-button${favorite ? ' favorited' : ''}`}
        aria-label={favorite ? `Remove ${movie.title} from my list` : `Add ${movie.title} to my list`}
        aria-pressed={favorite}
        onClick={() => toggleFavorite(movie)}
      >
        <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <div className="movie-card-info">
        <Link to={`/movie/${movie.id}`} className="movie-title">{movie.title || movie.name || 'Untitled movie'}</Link>
        <span className="movie-year">{year}</span>
      </div>
    </article>
  )
}
