import { useNavigate } from 'react-router-dom'
import { categories, legalRemedies } from '@/data/legalData'
import { Scale, Shield, Users, Briefcase, Home, Baby, Accessibility, Leaf, GraduationCap, Heart, UserCheck, Smartphone, DollarSign, Heart as Marriage } from 'lucide-react'
import './BrowsePage.css'

const categoryIcons: Record<string, any> = {
  'domestic-violence': Shield,
  'road-quarrel': Briefcase,
  'gender-violence': Users,
  'workplace': Briefcase,
  'police-misconduct': Scale,
  'property-disputes': Home,
  'child-rights': Baby,
  'disability-rights': Accessibility,
  'environmental': Leaf,
  'education': GraduationCap,
  'healthcare': Heart,
  'senior-citizens': UserCheck,
  'cyber-crime': Smartphone,
  'financial-fraud': DollarSign,
  'marriage-family': Marriage,
}

export default function BrowsePage() {
  const navigate = useNavigate()

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/?category=${categoryId}`)
  }

  return (
    <div className="browse-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Browse by Category</h1>
          <p className="hero-subtitle">Explore legal rights organized by common situations</p>
        </div>
      </div>

      <div className="categories-container">
        <div className="categories-grid">
          {categories.map(category => {
            const Icon = categoryIcons[category.id] || Scale
            const count = legalRemedies.filter(remedy => 
              remedy.categoryIds.includes(category.id)
            ).length
            
            return (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-icon">
                  <Icon size={32} />
                </div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-count">{count} remedies</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}