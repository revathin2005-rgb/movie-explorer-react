import { AlertCircle, RotateCw } from 'lucide-react'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <span className="error-icon"><AlertCircle size={21} /></span>
      <div><strong>Something went wrong</strong><p>{message}</p></div>
      {onRetry && <button type="button" className="retry-button" onClick={onRetry}><RotateCw size={15} /> Try again</button>}
    </div>
  )
}
