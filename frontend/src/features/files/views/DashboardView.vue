<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Message from 'primevue/message'
import ProgressBar from 'primevue/progressbar'
import { useAuthStore } from '@/features/auth/stores/auth'
import { useFilesStore } from '@/features/files/stores/files'

export default defineComponent({
  name: 'DashboardView',
  components: {
    Button,
    DataTable,
    Column,
    Message,
    ProgressBar
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const filesStore = useFilesStore()

    const isDragging = ref(false)
    const selectedFile = ref<File | null>(null)

    const handleLogout = () => {
      authStore.logout()
      router.push('/login')
    }

    const onDragOver = (event: DragEvent) => {
      event.preventDefault()
      isDragging.value = true
    }

    const onDragLeave = () => {
      isDragging.value = false
    }

    const onDrop = (event: DragEvent) => {
      event.preventDefault()
      isDragging.value = false

      const files = event.dataTransfer?.files
      if (files && files.length > 0) {
        handleFile(files[0])
      }
    }

    const onFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input.files && input.files.length > 0) {
        handleFile(input.files[0])
      }
    }

    const handleFile = async (file: File) => {
      if (!file.name.endsWith('.csv')) {
        filesStore.uploadError = [{ row: 0, field: 'file', message: 'Only CSV files are allowed' }]
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        filesStore.uploadError = [{ row: 0, field: 'file', message: 'File size must be less than 10MB' }]
        return
      }

      selectedFile.value = file
      await filesStore.uploadFile(file)
      selectedFile.value = null
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const formatSize = (bytes: number) => {
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    const clearErrors = () => {
      filesStore.clearUploadState()
    }

    onMounted(async () => {
      await authStore.fetchUser()
      await filesStore.fetchFiles()
    })

    return {
      authStore,
      filesStore,
      isDragging,
      selectedFile,
      handleLogout,
      onDragOver,
      onDragLeave,
      onDrop,
      onFileSelect,
      formatDate,
      formatSize,
      clearErrors,
      isAdmin: authStore.user?.role === 'ADMIN'
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">CSV Manager - Dashboard</h1>
        <div class="flex items-center gap-4">
          <span class="text-gray-600">{{ authStore.user?.email }}</span>
          <span class="text-sm text-gray-500">({{ authStore.user?.role }})</span>
          <Button label="Logout" severity="secondary" @click="handleLogout" />
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Upload CSV File</h2>

        <div
          class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
          :class="isDragging ? 'border-primary bg-blue-50' : 'border-gray-300'"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
        >
          <i class="pi pi-upload text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-600 mb-4">
            Drag and drop your CSV file here, or click to select
          </p>
          <input
            type="file"
            accept=".csv"
            class="hidden"
            id="fileInput"
            @change="onFileSelect"
          />
          <label for="fileInput">
            <Button
              label="Select File"
              severity="secondary"
              as="span"
              class="cursor-pointer"
            />
          </label>
          <p class="text-sm text-gray-400 mt-2">Maximum file size: 10MB</p>
        </div>

        <ProgressBar
          v-if="filesStore.loading && filesStore.uploadProgress > 0"
          :value="filesStore.uploadProgress"
          class="mt-4"
          :showValue="false"
        />

        <div v-if="selectedFile" class="mt-4 text-sm text-gray-600">
          Selected: {{ selectedFile.name }} ({{ formatSize(selectedFile.size) }})
        </div>

        <div v-if="filesStore.uploadError" class="mt-4">
          <Message severity="error" @close="clearErrors">
            <strong>Upload Failed:</strong>
          </Message>
          <div class="mt-2 bg-red-50 border border-red-200 rounded p-4 max-h-60 overflow-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left">
                  <th class="pr-4 pb-2">Row</th>
                  <th class="pr-4 pb-2">Field</th>
                  <th class="pb-2">Error</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(error, index) in filesStore.uploadError" :key="index" class="border-t border-red-100">
                  <td class="pr-4 py-2">{{ error.row || 'File' }}</td>
                  <td class="pr-4 py-2 font-medium">{{ error.field }}</td>
                  <td class="py-2 text-red-600">{{ error.message }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="filesStore.uploadSuccess" class="mt-4">
          <Message severity="success" @close="clearErrors">
            File uploaded successfully!
          </Message>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Your CSV Files</h2>

        <DataTable
          :value="filesStore.files"
          :loading="filesStore.loading"
          stripedRows
          class="w-full"
        >
          <Column field="name" header="File Name" sortable />
          <Column header="Size" sortable sortField="size">
            <template #body="{ data }">
              {{ formatSize(data.size) }}
            </template>
          </Column>
          <Column field="uploadedBy" header="Uploaded By" sortable />
          <Column header="Documents">
            <template #body="{ data }">
              {{ data._count?.documents || 0 }}
            </template>
          </Column>
          <Column field="createdAt" header="Upload Date" sortable>
            <template #body="{ data }">
              {{ formatDate(data.createdAt) }}
            </template>
          </Column>
        </DataTable>

        <div v-if="!filesStore.loading && filesStore.files.length === 0" class="text-center py-8">
          <p class="text-gray-500">No files uploaded yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>
