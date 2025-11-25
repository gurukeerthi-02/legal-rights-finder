import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { legalTypes, legalRemedies } from '@/data/legalData'
import Logo from '@/components/Logo'
import './BrowsePage.css'

export default function BrowsePage() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredRemedies = selectedType === 'all' 
    ? legalRemedies 
    : legalRemedies.filter(remedy => remedy.legalTypeId === selectedType)

  return (
    <div className="browse-page">
      <div className="header">
        <div className="header-logo">
          <Logo size={40} showText={false} />
        </div>
        <h1 className="header-title">Browse Legal Remedies</h1>
        <p className="header-subtitle">Explore all available legal rights and remedies</p>
      </div>

      <div className="filter-section">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            All ({legalRemedies.length})
          </button>
          {legalTypes.map(type => {
            const count = legalRemedies.filter(remedy => remedy.legalTypeId === type.id).length
            return (
              <button
                key={type.id}
                className={`filter-tab ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                {type.name} ({count})
              </button>
            )
          })}
        </div>
      </div>

      <div className="remedies-list">
        {filteredRemedies.map(remedy => {
          const legalType = legalTypes.find(type => type.id === remedy.legalTypeId)
          return (
            <div
              key={remedy.id}
              className="remedy-card"
              onClick={() => navigate(`/details/${remedy.id}`)}
            >
              <div className="remedy-header">
                <span className="remedy-type">{legalType?.name}</span>
              </div>
              <h3 className="remedy-title">{remedy.title}</h3>
              <p className="remedy-reference">{remedy.legalReference}</p>
              <p className="remedy-description">
                {remedy.description.length > 150
                  ? `${remedy.description.substring(0, 150)}...`
                  : remedy.description}
              </p>
              <div className="remedy-meta">
                <span className="remedy-authority">{remedy.authority}</span>
                <span className="remedy-link">View details →</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}