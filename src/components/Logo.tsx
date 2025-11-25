import { Scale } from 'lucide-react'
import './Logo.css'

interface LogoProps {
  size?: number
  showText?: boolean
}

export default function Logo({ size = 32, showText = true }: LogoProps) {
  return (
    <div className="logo">
      <div className="logo-icon" style={{ width: size, height: size }}>
        <Scale size={size} color="#2563eb" />
      </div>
      {showText && (
        <span className="logo-text">Legal Rights Finder</span>
      )}
    </div>
  )
}