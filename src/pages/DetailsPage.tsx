import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Building, AlertCircle } from 'lucide-react'
import { getRemedyById } from '@/lib/searchEngine'
import './DetailsPage.css'

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const remedy = id ? getRemedyById(id) : null

  if (!remedy) {
    return (
      <div className="details-page">
        <div className="header">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <h1 className="header-title">Legal Remedy</h1>
        </div>
        <div className="not-found">
          <h2>Remedy not found</h2>
          <p>The requested legal remedy could not be found.</p>
        </div>
      </div>
    )
  }

  const formatSteps = (text: string) => {
    return text.split('\\n').map((step, index) => (
      <li key={index}>{step}</li>
    ))
  }

  return (
    <div className="details-page">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
        </button>
        <h1 className="header-title">Legal Remedy Details</h1>
      </div>

      <div className="content">
        <div className="remedy-header">
          <span className="remedy-type">{remedy.legalType}</span>
          <h2 className="remedy-title">{remedy.title}</h2>
          <p className="remedy-reference">{remedy.legalReference}</p>
        </div>

        <div className="section">
          <h3 className="section-title">Description</h3>
          <p className="section-content">{remedy.description}</p>
        </div>

        <div className="section">
          <h3 className="section-title">
            <Users size={18} />
            Eligibility
          </h3>
          <p className="section-content">{remedy.eligibility}</p>
        </div>

        <div className="section">
          <h3 className="section-title">
            <Clock size={18} />
            Time Limit
          </h3>
          <p className="section-content">{remedy.timeLimit}</p>
        </div>

        <div className="section">
          <h3 className="section-title">
            <Building size={18} />
            Authority
          </h3>
          <p className="section-content">{remedy.authority}</p>
        </div>

        <div className="section">
          <h3 className="section-title">How to Use This Remedy</h3>
          <ol className="steps-list">
            {formatSteps(remedy.howToUse)}
          </ol>
        </div>

        <div className="disclaimer">
          <div className="disclaimer-header">
            <AlertCircle size={18} />
            <span>Legal Disclaimer</span>
          </div>
          <p>
            This information is for educational purposes only and should not be considered as legal advice. 
            Please consult with a qualified lawyer for specific legal guidance related to your situation.
          </p>
        </div>
      </div>
    </div>
  )
}