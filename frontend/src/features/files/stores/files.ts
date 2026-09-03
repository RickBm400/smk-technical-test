import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import type { AxiosProgressEvent } from 'axios'

export interface UploadedFile {
  id: string
  name: string
  size: number
  uploadedBy: string
  createdAt: string
  _count?: {
    documents: number
  }
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

export const useFilesStore = defineStore('files', () => {
  const files = ref<UploadedFile[]>([])
  const loading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref<CsvError[] | null>(null)
  const uploadSuccess = ref(false)

  const fetchFiles = async () => {
    loading.value = true
    try {
      const { data } = await api.get<UploadedFile[]>('/files')
      files.value = data
    } catch (error) {
      console.error('Failed to fetch files:', error)
    } finally {
      loading.value = false
    }
  }

  const uploadFile = async (file: File) => {
    loading.value = true
    uploadProgress.value = 0
    uploadError.value = null
    uploadSuccess.value = false

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await api.post<UploadResponse | UploadErrorResponse>('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }
        }
      })

      if (response.data.success) {
        const data = response.data as UploadResponse
        uploadSuccess.value = true
        await fetchFiles()
        return { success: true, data }
      } else {
        const errorData = response.data as UploadErrorResponse
        uploadError.value = errorData.errors
        return { success: false, errors: errorData.errors }
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        uploadError.value = error.response.data.errors
        return { success: false, errors: error.response.data.errors }
      }
      return { success: false, errors: [{ row: 0, field: 'file', message: 'Upload failed' }] }
    } finally {
      loading.value = false
      uploadProgress.value = 0
    }
  }

  const deleteFile = async (id: string) => {
    try {
      await api.delete(`/files/${id}`)
      await fetchFiles()
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || 'Delete failed'
      }
    }
  }

  const clearUploadState = () => {
    uploadError.value = null
    uploadSuccess.value = false
  }

  return {
    files,
    loading,
    uploadProgress,
    uploadError,
    uploadSuccess,
    fetchFiles,
    uploadFile,
    deleteFile,
    clearUploadState
  }
})
