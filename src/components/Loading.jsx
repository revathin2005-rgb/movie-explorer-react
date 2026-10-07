export default function Loading({ label = 'Finding your next favorite...' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loader" />
      <span>{label}</span>
    </div>
  )
}
