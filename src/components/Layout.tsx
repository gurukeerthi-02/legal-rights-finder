import { Link, useLocation } from 'react-router-dom'
import { Search, BookOpen, Info, Home } from 'lucide-react'
import Logo from './Logo'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Search' },
    { path: '/browse', icon: BookOpen, label: 'Browse' },
    { path: '/about', icon: Info, label: 'About' },
  ]

  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
      
      <nav className="bottom-nav">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}