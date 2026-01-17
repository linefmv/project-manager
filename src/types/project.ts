export interface Project {
    id: string
    name: string
    client: string
    startDate: string
    endDate: string
    coverImage?: string
    favorite: boolean
    createdAt: string
    updatedAt: string
}

export interface CreateProjectInput {
    name: string
    client: string
    startDate: string
    endDate: string
    coverImage?: string
}

export type UpdateProjectInput = CreateProjectInput

export type SortOption = 'alphabetical' | 'recent' | 'deadline'

export interface ApiError {
    error: string
    message: string
    statusCode: number
}

export interface ProjectsResponse {
    projects: Project[]
    total: number
}

export interface ProjectResponse {
    project: Project
}

export interface SearchResponse {
    projects: Project[]
    query: string
    total: number
}

export interface DeleteResponse {
    success: boolean
}
