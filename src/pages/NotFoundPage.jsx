import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <main className="not-found"><span className="section-kicker">SCENE NOT FOUND</span><h1>That’s a wrap.</h1><p>This page isn’t part of our story.</p><Link className="watchlist-button" to="/">Back to discover</Link></main>
}
