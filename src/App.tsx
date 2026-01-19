import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { LoadingOverlay } from './components/LoadingOverlay/LoadingOverlay'

const Projects = lazy(() => import('./pages/Projects/Projects'))
const CreateProject = lazy(() => import('./pages/CreateProject/CreateProject'))
const EditProject = lazy(() => import('./pages/EditProject/EditProject'))
const SearchResults = lazy(() => import('./pages/SearchResults/SearchResults'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

function App() {
    return (
        <Layout>
            <Suspense fallback={<LoadingOverlay />}>
                <Routes>
                    <Route path="/" element={<Projects />} />
                    <Route path="/projects/new" element={<CreateProject />} />
                    <Route path="/projects/:id/edit" element={<EditProject />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Layout>
    )
}

export default App
