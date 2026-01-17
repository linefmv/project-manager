import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { SearchResults } from './pages/SearchResults/SearchResults'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </Layout>
    )
}

export default App
