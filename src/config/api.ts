export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_ENDPOINTS = {
    projects: '/projects',
    projectById: (id: string) => `/projects/${id}`,
    projectFavorite: (id: string) => `/projects/${id}/favorite`,
    projectSearch: '/projects/search',
} as const
