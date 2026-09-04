import { defineStore } from 'pinia'
import api from '@/services/api'
import type { AxiosProgressEvent } from 'axios'

export interface UploadedFile {
  id: string
  name: string
  size: number
  uploadedBy: string
  createdAt: string
  documentCount?: number
}

export interface UploadResponse {
  success: boolean
  file: UploadedFile
  documentsCreated: number
}

export interface CsvError {
  row: number
  field: string
  message: string
}

export interface UploadErrorResponse {
  success: false
  errors: CsvError[]
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface FilesResponse {
  data: UploadedFile[]
  pagination: PaginationInfo
}

interface State {
  files: UploadedFile[]
  loading: boolean
  uploadProgress: number
  uploadError: CsvError[] | null
  uploadSuccess: boolean
  pagination: PaginationInfo
  searchQuery: string
}

export const useFilesStore = defineStore('files', {
  state: (): State => ({
    files: [],
    loading: false,
    uploadProgress: 0,
    uploadError: null,
    uploadSuccess: false,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    },
    searchQuery: ''
  }),
  actions: {
    async fetchFiles() {
      this.loading = true
      try {
        const { data } = await api.get<FilesResponse>('/files', {
          params: {
            page: this.pagination.page,
            limit: this.pagination.limit,
            search: this.searchQuery
          }
        })
        this.files = data.data
        this.pagination = data.pagination
      } catch (error) {
        console.error('Failed to fetch files:', error)
      } finally {
        this.loading = false
      }
    },
    setPage(page: number) {
      this.pagination.page = page
      this.fetchFiles()
    },
    async uploadFile(file: File) {
      this.loading = true
      this.uploadProgress = 0
      this.uploadError = null
      this.uploadSuccess = false

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await api.post<UploadResponse | UploadErrorResponse>('/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }
          }
        })

        if (response.data.success) {
          const data = response.data as UploadResponse
          this.uploadSuccess = true
          await this.fetchFiles()
          return { success: true, data }
        } else {
          const errorData = response.data as UploadErrorResponse
          this.uploadError = errorData.errors
          return { success: false, errors: errorData.errors }
        }
      } catch (error: unknown) {
        const result = this.handleUploadError(error)
        this.uploadError = result.errors
        return { success: false, errors: result.errors }
      } finally {
        this.loading = false
        this.uploadProgress = 0
      }
    },
    async deleteFile(id: string) {
      try {
        await api.delete(`/files/${id}`)
        await this.fetchFiles()
        return { success: true }
      } catch (error: unknown) {
        const message = this.getErrorMessage(error, 'Eliminación fallida')
        return { success: false, message }
      }
    },
    async downloadFile(id: string, filename: string) {
      try {
        const response = await api.get(`/files/${id}/download`, {
          responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)

        return { success: true }
      } catch (error: unknown) {
        const message = this.getErrorMessage(error, 'Descarga fallida')
        return { success: false, message }
      }
    },
    setUploadError(errors: CsvError[]) {
      this.uploadError = errors
    },
    clearUploadState() {
      this.uploadError = null
      this.uploadSuccess = false
    },
    getErrorMessage(error: unknown, fallback: string): string {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string } } }
        return axiosError.response?.data?.error || fallback
      }
      return fallback
    },
    handleUploadError(error: unknown): { errors: CsvError[] } {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { errors?: CsvError[]; error?: string } } }
        if (axiosError.response?.data?.errors) {
          return { errors: axiosError.response.data.errors }
        }
        if (axiosError.response?.data?.error) {
          return { errors: [{ row: 0, field: 'file', message: axiosError.response.data.error }] }
        }
      }
      return { errors: [{ row: 0, field: 'file', message: 'Carga fallida' }] }
    }
  }
})
