import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Filter, X } from 'lucide-react'
import { legalTypes, categories } from '@/data/legalData'
import { searchLegalRemedies, type SearchResult } from '@/lib/searchEngine'
import Logo from '@/components/Logo'
import './SearchPage.css'

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const category = categories.find(c => c.id === categoryParam)
      if (category) {
        setQuery(category.keywords[0] || category.name)
        setSearched(true)
        handleSearchWithQuery(category.keywords[0] || category.name)
      }
    }
  }, [searchParams])

  const handleSearchWithQuery = async (searchQuery: string = query) => {
    if (!searchQuery.trim() && selectedFilters.length === 0) {
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const { results: searchResults } = await searchLegalRemedies({
        query: searchQuery,
        filters: selectedFilters,
      })
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => handleSearchWithQuery()

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    )
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setSearched(false)
    setSelectedFilters([])
  }

  const handleExampleSearch = async (exampleQuery: string) => {
    setQuery(exampleQuery)
    handleSearchWithQuery(exampleQuery)
  }

  return (
    <div className="search-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Legal Rights</h1>
          <p className="hero-subtitle">Discover legal remedies and protections under Indian law</p>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <textarea
            className="search-input"
            placeholder="Describe your situation (e.g., violence in household)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSearch()
              }
            }}
            rows={2}
          />
          {query.length > 0 && (
            <button onClick={clearSearch} className="clear-button">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="filter-row">
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>
              Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
            </span>
          </button>

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {showFilters && (
          <div className="filter-container">
            <div className="filter-header">
              <h3 className="filter-title">Filter by Type</h3>
              {selectedFilters.length > 0 && (
                <button onClick={clearFilters} className="clear-filters-button">
                  Clear All
                </button>
              )}
            </div>
            <div className="filter-chips">
              {legalTypes.map(type => (
                <button
                  key={type.id}
                  className={`filter-chip ${
                    selectedFilters.includes(type.id) ? 'active' : ''
                  }`}
                  onClick={() => toggleFilter(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="results-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
            <p className="loading-text">Searching legal remedies...</p>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="empty-container">
            <h2 className="empty-title">No results found</h2>
            <p className="empty-text">
              Try different keywords or adjust your filters
            </p>
          </div>
        ) : results.length > 0 ? (
          <>
            <p className="results-count">
              Found {results.length} {results.length === 1 ? 'remedy' : 'remedies'}
            </p>
            {results.map(result => (
              <div
                key={result.id}
                className="result-card"
                onClick={() => navigate(`/details/${result.id}`)}
              >
                <div className="result-header">
                  <span className="result-type">{result.legalType}</span>
                </div>
                <h3 className="result-title">{result.title}</h3>
                <p className="result-reference">{result.legalReference}</p>
                <p className="result-description">
                  {result.description.length > 200
                    ? `${result.description.substring(0, 200)}...`
                    : result.description}
                </p>
                <span className="result-link">View details →</span>
              </div>
            ))}
          </>
        ) : (
          <div className="empty-container">
            <h2 className="empty-title">Start Your Search</h2>
            <p className="empty-text">
              Enter a situation like "violence in household" or "injustice in road
              quarrel" to find relevant legal rights and remedies
            </p>
            <div className="example-container">
              <p className="example-title">Example searches:</p>
              <button
                className="example-chip"
                onClick={() => handleExampleSearch('violence in household')}
              >
                Violence in household
              </button>
              <button
                className="example-chip"
                onClick={() => handleExampleSearch('road quarrel')}
              >
                Road quarrel
              </button>
              <button
                className="example-chip"
                onClick={() => handleExampleSearch('gender based violence')}
              >
                Gender based violence
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}