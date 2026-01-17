import { API_BASE_URL, API_ENDPOINTS } from '../config/api'
import type {
    CreateProjectInput,
    UpdateProjectInput,
    SortOption,
    ApiError,
    ProjectsResponse,
    ProjectResponse,
    SearchResponse,
    DeleteResponse,
} from '../types/project'

const DEFAULT_TIMEOUT = 30000

async function request<T>(
    endpoint: string,
    options?: RequestInit & { timeout?: number }
): Promise<T> {
    const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options || {}
    const url = `${API_BASE_URL}${endpoint}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...fetchOptions?.headers,
            },
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                error: 'UnknownError',
                message: 'Erro desconhecido no servidor',
                statusCode: response.status,
            }))
            throw error as ApiError
        }

        return response.json()
    } catch (error) {
        clearTimeout(timeoutId)

        if (error instanceof Error && error.name === 'AbortError') {
            throw {
                error: 'TimeoutError',
                message: 'A requisição demorou muito para responder',
                statusCode: 408,
            } as ApiError
        }

        if ((error as ApiError).statusCode) {
            throw error
        }

        throw {
            error: 'NetworkError',
            message: 'Não foi possível conectar ao servidor',
            statusCode: 0,
        } as ApiError
    }
}

function buildQueryString(params: Record<string, string | boolean | undefined>): string {
    const queryParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, String(value))
        }
    })

    return queryParams.toString()
}

export async function getProjects(params?: {
    favorite?: boolean
    sort?: SortOption
}): Promise<ProjectsResponse> {
    const queryString = params ? buildQueryString(params) : ''
    const endpoint = queryString
        ? `${API_ENDPOINTS.projects}?${queryString}`
        : API_ENDPOINTS.projects

    return request<ProjectsResponse>(endpoint)
}

export async function getProjectById(id: string): Promise<ProjectResponse> {
    return request<ProjectResponse>(API_ENDPOINTS.projectById(id))
}

export async function createProject(data: CreateProjectInput): Promise<ProjectResponse> {
    return request<ProjectResponse>(API_ENDPOINTS.projects, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export async function updateProject(
    id: string,
    data: UpdateProjectInput
): Promise<ProjectResponse> {
    return request<ProjectResponse>(API_ENDPOINTS.projectById(id), {
        method: 'PUT',
        body: JSON.stringify(data),
    })
}

export async function deleteProject(id: string): Promise<DeleteResponse> {
    return request<DeleteResponse>(API_ENDPOINTS.projectById(id), {
        method: 'DELETE',
    })
}

export async function toggleFavorite(id: string, favorite: boolean): Promise<ProjectResponse> {
    return request<ProjectResponse>(API_ENDPOINTS.projectFavorite(id), {
        method: 'PATCH',
        body: JSON.stringify({ favorite }),
    })
}

export async function searchProjects(query: string): Promise<SearchResponse> {
    const queryString = buildQueryString({ q: query })
    const endpoint = `${API_ENDPOINTS.projectSearch}?${queryString}`

    return request<SearchResponse>(endpoint)
}

