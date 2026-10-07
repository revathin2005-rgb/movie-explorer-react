const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_BASE = 'https://api.themoviedb.org/3'

export const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const GENRES = [
  { id: null, name: 'For you' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
]

async function request(path, signal) {
  if (!API_KEY) {
    throw new Error('Add your TMDB API key to .env as VITE_TMDB_API_KEY to start exploring movies.')
  }

  let response
  try {
    response = await fetch(`${API_BASE}${path}${path.includes('?') ? '&' : '?'}api_key=${encodeURIComponent(API_KEY)}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('Could not connect to TMDB. Check your internet connection and try again.')
  }

  if (!response.ok) {
    if (response.status === 401) throw new Error('TMDB did not accept this API key. Check VITE_TMDB_API_KEY in your .env file.')
    if (response.status === 404) throw new Error('We could not find that movie. It may no longer be available.')
    if (response.status === 429) throw new Error('Too many requests right now. Please wait a moment and try again.')
    throw new Error(`TMDB request failed (${response.status}). Please try again.`)
  }

  return response.json()
}

export function getMovies({ query, genreId, page = 1, signal } = {}) {
  if (query?.trim()) {
    return request(`/search/movie?query=${encodeURIComponent(query.trim())}&include_adult=false&page=${page}`, signal)
  }
  if (genreId) {
    return request(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`, signal)
  }
  return request(`/movie/popular?page=${page}`, signal)
}

export function getMovieDetails(movieId, signal) {
  return request(`/movie/${encodeURIComponent(movieId)}?append_to_response=credits`, signal)
}
