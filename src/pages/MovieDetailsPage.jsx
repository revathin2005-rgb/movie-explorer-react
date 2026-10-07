import { ArrowLeft, CalendarDays, Clock3, Heart, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovieDetails, IMAGE_BASE } from '../api/tmdb.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

function formatRuntime(minutes) {
  if (!minutes) return 'Not available'
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return `${hours ? `${hours}h ` : ''}${remainder}m`
}

export default function MovieDetailsPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    getMovieDetails(movieId, controller.signal)
      .then(setMovie)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message || 'Unable to load movie details.')
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [movieId, retry])

  if (loading) return <main className="detail-page page-container"><Loading label="Loading movie details..." /></main>
  if (error) return <main className="detail-page page-container"><Link to="/" className="back-link"><ArrowLeft size={16} /> Back to discover</Link><ErrorMessage message={error} onRetry={() => setRetry((count) => count + 1)} /></main>
  if (!movie) return null

  const favorite = isFavorite(movie.id)
  const cast = movie.credits?.cast?.slice(0, 6) || []
  const releaseYear = movie.release_date?.slice(0, 4)

  return (
    <main className="detail-page">
      <div className="detail-backdrop" style={movie.backdrop_path ? { backgroundImage: `url(${IMAGE_BASE}/original${movie.backdrop_path})` } : undefined} />
      <div className="detail-content page-container">
        <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to discover</Link>
        <div className="detail-layout">
          <div className="detail-poster-frame">
            {movie.poster_path ? <img src={`${IMAGE_BASE}/w500${movie.poster_path}`} alt={`${movie.title} poster`} /> : <div className="detail-poster-placeholder">POSTER<br />UNAVAILABLE</div>}
          </div>
          <div className="detail-copy">
            <span className="section-kicker">MOVIE DETAILS</span>
            <h1>{movie.title || 'Untitled movie'}{releaseYear && <span className="detail-year"> ({releaseYear})</span>}</h1>
            {movie.tagline && <p className="movie-tagline">“{movie.tagline}”</p>}
            <div className="detail-meta">
              <span className="detail-rating"><Star size={16} fill="currentColor" /> {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'Not rated'} <small>/ 10</small></span>
              <span><CalendarDays size={15} /> {movie.release_date || 'Release date unavailable'}</span>
              <span><Clock3 size={15} /> {formatRuntime(movie.runtime)}</span>
            </div>
            <div className="detail-genres">{movie.genres?.length ? movie.genres.map((genre) => <span key={genre.id}>{genre.name}</span>) : <span>Genre unavailable</span>}</div>
            <h2>Overview</h2>
            <p className="overview">{movie.overview || 'An overview for this movie is not available yet.'}</p>
            <button type="button" className={`watchlist-button${favorite ? ' is-saved' : ''}`} aria-pressed={favorite} onClick={() => toggleFavorite(movie)}>
              <Heart size={17} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Saved to My List' : 'Add to My List'}
            </button>
            <section className="cast-section">
              <h2>Top cast</h2>
              {cast.length
                ? <div className="cast-list">{cast.map((person) => <div className="cast-person" key={person.cast_id || person.credit_id}><strong>{person.name}</strong><span>{person.character || 'Cast'}</span></div>)}</div>
                : <p className="muted-copy">Cast information is not available.</p>}
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
