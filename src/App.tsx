import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Projects } from './pages/Projects/Projects'
import { CreateProject } from './pages/CreateProject/CreateProject'
import { EditProject } from './pages/EditProject/EditProject'
import { SearchResults } from './pages/SearchResults/SearchResults'
import { NotFound } from './pages/NotFound/NotFound'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Projects />} />
                <Route path="/projects/new" element={<CreateProject />} />
                <Route path="/projects/:id/edit" element={<EditProject />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    )
}

export default App
