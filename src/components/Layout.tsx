import { Link, useLocation } from 'react-router-dom'
import { Search, BookOpen, Info, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/', icon: Search, label: 'Search' },
    { path: '/browse', icon: BookOpen, label: 'Browse' },
    { path: '/about', icon: Info, label: 'About' },
  ]

  return (
    <div className="layout">
      <header className="top-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <Logo size={32} showText={true} />
          </Link>
          
          <nav className="desktop-nav">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`mobile-nav-link ${location.pathname === path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        )}
      </header>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}