import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'
import BrowsePage from './pages/BrowsePage'
import AboutPage from './pages/AboutPage'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  )
}

export default App