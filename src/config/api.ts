export const API_BASE_URL = 'https://us-central1-backend-project-manager.cloudfunctions.net/api'

export const API_ENDPOINTS = {
    projects: '/projects',
    projectById: (id: string) => `/projects/${id}`,
    projectFavorite: (id: string) => `/projects/${id}/favorite`,
    projectSearch: '/projects/search',
}
