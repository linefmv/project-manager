import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { ProjectsList } from './pages/ProjectsList/ProjectsList'
import { CreateProject } from './pages/CreateProject/CreateProject'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<ProjectsList />} />
                <Route path="/projects/new" element={<CreateProject />} />
            </Routes>
        </Layout>
    )
}

export default App
