import { Scale, Shield, Users, BookOpen } from 'lucide-react'
import Logo from '@/components/Logo'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="header">
        <div className="header-logo">
          <Logo size={40} showText={false} />
        </div>
        <h1 className="header-title">About Legal Rights Finder</h1>
        <p className="header-subtitle">Empowering citizens with legal knowledge</p>
      </div>

      <div className="content">
        <div className="mission-section">
          <div className="mission-icon">
            <Scale size={32} />
          </div>
          <h2>Our Mission</h2>
          <p>
            To make legal rights and remedies accessible to every citizen of India. 
            We believe that knowledge of one's legal rights is fundamental to justice 
            and equality in society.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <Shield size={24} />
            <h3>Know Your Rights</h3>
            <p>
              Comprehensive database of constitutional rights, fundamental rights, 
              and legal remedies available under Indian law.
            </p>
          </div>

          <div className="feature-card">
            <Users size={24} />
            <h3>For Everyone</h3>
            <p>
              Designed for citizens from all walks of life - no legal background 
              required to understand and use these resources.
            </p>
          </div>

          <div className="feature-card">
            <BookOpen size={24} />
            <h3>Educational Purpose</h3>
            <p>
              All information is provided for educational purposes to help you 
              understand your legal options and rights.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Describe Your Situation</h4>
                <p>Enter keywords describing your legal issue or situation</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Get Relevant Results</h4>
                <p>Our search engine finds applicable legal remedies and rights</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Learn and Act</h4>
                <p>Understand your options and take informed legal action</p>
              </div>
            </div>
          </div>
        </div>

        <div className="coverage-section">
          <h2>Legal Areas Covered</h2>
          <div className="coverage-grid">
            <div className="coverage-item">Domestic Violence</div>
            <div className="coverage-item">Gender-Based Violence</div>
            <div className="coverage-item">Workplace Issues</div>
            <div className="coverage-item">Police Misconduct</div>
            <div className="coverage-item">Road Accidents</div>
            <div className="coverage-item">Consumer Rights</div>
            <div className="coverage-item">Constitutional Rights</div>
            <div className="coverage-item">Criminal Law</div>
          </div>
        </div>

        <div className="disclaimer-section">
          <h2>Important Disclaimer</h2>
          <div className="disclaimer-content">
            <p>
              <strong>This platform is for educational and informational purposes only.</strong>
            </p>
            <ul>
              <li>The information provided should not be considered as legal advice</li>
              <li>Always consult with a qualified lawyer for specific legal guidance</li>
              <li>Laws and procedures may vary by state and jurisdiction</li>
              <li>We recommend verifying information with official legal sources</li>
            </ul>
          </div>
        </div>

        <div className="contact-section">
          <h2>Need Legal Help?</h2>
          <p>
            For immediate legal assistance, contact your local legal aid services 
            or consult with a qualified lawyer. Many states provide free legal aid 
            for eligible citizens.
          </p>
          <div className="helpline">
            <strong>National Legal Services Authority Helpline: 15100</strong>
          </div>
        </div>
      </div>
    </div>
  )
}