import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { ProjectsList } from './pages/ProjectsList/ProjectsList'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<ProjectsList />} />
            </Routes>
        </Layout>
    )
}

export default App
