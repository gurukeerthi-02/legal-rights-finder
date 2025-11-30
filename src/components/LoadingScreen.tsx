import { Gavel } from 'lucide-react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <Gavel size={48} />
        </div>
        <h1 className="loading-title">Legal Rights Finder</h1>
        <p className="loading-subtitle">Abolishing Legal Ignorance</p>
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
        </div>
      </div>
    </div>
  )
}