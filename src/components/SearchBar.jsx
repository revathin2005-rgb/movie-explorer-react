import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function SearchBar({ onSearch, compact = false }) {
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')
  const inputRef = useRef(null)

  useEffect(() => setValue(searchParams.get('q') || ''), [searchParams])
  useEffect(() => {
    if (!compact && searchParams.get('focus') === 'search') inputRef.current?.focus()
  }, [compact, searchParams])

  function submit(event) {
    event.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form className={`search-form${compact ? ' compact' : ''}`} onSubmit={submit} role="search">
      <Search size={compact ? 16 : 19} aria-hidden="true" />
      <input
        ref={inputRef}
        aria-label="Search movies"
        placeholder={compact ? 'Search movies...' : 'Search for a movie, genre, or mood...'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {value && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => { setValue(''); onSearch('') }}><X size={16} /></button>}
      {!compact && <button className="search-submit" type="submit">Search</button>}
      {compact && <button className="sr-only" type="submit">Search</button>}
    </form>
  )
}
