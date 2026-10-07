import { ArrowRight, Film, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GENRES, getMovies, IMAGE_BASE } from '../api/tmdb.js'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [genreId, setGenreId] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  const loadMovies = useCallback(async (signal) => {
    setLoading(true)
    setError('')
    try {
      const data = await getMovies({ query, genreId: query ? null : genreId, signal })
      setMovies(Array.isArray(data.results) ? data.results : [])
    } catch (requestError) {
      if (requestError.name !== 'AbortError') setError(requestError.message || 'Unable to load movies right now.')
    } finally {
      if (!signal.aborted) setLoading(false)
    }
  }, [query, genreId, retry])

  useEffect(() => {
    const controller = new AbortController()
    loadMovies(controller.signal)
    return () => controller.abort()
  }, [loadMovies])

  const featured = useMemo(() => movies.find((movie) => movie.backdrop_path) || movies[0], [movies])
  const heading = query ? `Results for “${query}”` : genreId ? `${GENRES.find((genre) => genre.id === genreId)?.name} movies` : 'Popular right now'

  function searchMovies(value) {
    setGenreId(null)
    if (value) setSearchParams({ q: value })
    else setSearchParams({})
  }

  return (
    <main>
      {!query && (
        <section className="hero" style={featured?.backdrop_path ? { '--hero-image': `url(${IMAGE_BASE}/original${featured.backdrop_path})` } : undefined}>
          <div className="hero-content">
            <span className="eyebrow"><Sparkles size={14} /> YOUR NEXT FAVORITE FILM</span>
            <h1>Stories worth<br /><span>staying in for.</span></h1>
            <p>Find the film you didn’t know you were looking for.</p>
            <div className="hero-search"><SearchBar onSearch={searchMovies} /></div>
            {featured && <Link className="hero-featured-link" to={`/movie/${featured.id}`}>Explore the collection <ArrowRight size={16} /></Link>}
          </div>
          {featured && <>
            <div className="hero-caption">
              <span className="caption-line" />
              <span>FEATURED PICK</span>
              <strong>{featured.title || 'Discover something new'}</strong>
            </div>
            <div className="hero-index">01 <span>/ 04</span></div>
          </>}
        </section>
      )}

      <section className="discover-section page-container">
        <div className="section-intro">
          <div>
            <span className="section-kicker"><Film size={14} /> THE COLLECTION</span>
            <h2>{heading}</h2>
            <p>{query ? 'A few picks that match your search.' : 'Handpicked by the crowd. Ready for your watchlist.'}</p>
          </div>
          <span className="results-label">{!loading && !error ? `${movies.length} FILMS` : 'CURATED FOR YOU'}</span>
        </div>
        {query && <div className="results-search"><SearchBar onSearch={searchMovies} /></div>}
        {!query && <CategoryFilter categories={GENRES} selected={genreId} onSelect={setGenreId} />}
        {loading ? <Loading /> : error ? <ErrorMessage message={error} onRetry={() => setRetry((count) => count + 1)} /> : movies.length ? <MovieGrid movies={movies} /> : (
          <div className="empty-state">
            <span className="empty-icon"><Film size={24} /></span>
            <h3>{query ? 'No films found' : 'Nothing to show just yet'}</h3>
            <p>{query ? `We couldn't find anything for “${query}”. Try another title.` : 'Try another category or check back soon.'}</p>
            {query && <button className="text-button" type="button" onClick={() => searchMovies('')}>Back to popular movies <ArrowRight size={15} /></button>}
          </div>
        )}
      </section>
      <footer className="site-footer page-container">
        <Link className="brand footer-brand" to="/"><span className="brand-mark"><Film size={16} /></span><span>CINE<span className="brand-light">SCOPE</span></span></Link>
        <span>Made for the love of a good story.</span>
        <span>Movie data provided by TMDB</span>
      </footer>
    </main>
  )
}
