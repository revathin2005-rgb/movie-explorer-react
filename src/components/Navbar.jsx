import { Clapperboard, Heart, Search } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header className="site-header">
      <div className="nav-inner">
        <NavLink className="brand" to="/" aria-label="CineScope home">
          <span className="brand-mark"><Clapperboard size={19} strokeWidth={2.4} /></span>
          <span>CINE<span className="brand-light">SCOPE</span></span>
        </NavLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Discover</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Heart size={15} /> My list</NavLink>
        </nav>
        <div className="nav-search"><SearchBar compact onSearch={(query) => navigate(`/?q=${encodeURIComponent(query)}`)} /></div>
        <NavLink className="mobile-search" to="/?focus=search" aria-label="Search movies"><Search size={19} /></NavLink>
      </div>
    </header>
  )
}
