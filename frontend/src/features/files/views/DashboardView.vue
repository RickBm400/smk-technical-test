<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Message from 'primevue/message'
import ProgressBar from 'primevue/progressbar'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import { useAuthStore } from '@/features/auth/stores/auth'
import { useFilesStore } from '@/features/files/stores/files'

export default defineComponent({
  name: 'DashboardView',
  components: {
    Button,
    DataTable,
    Column,
    Message,
    ProgressBar,
    InputText,
    Paginator
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
        filesStore.uploadError = [{ row: 0, field: 'file', message: 'Solo se permiten archivos CSV' }]
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        filesStore.uploadError = [{ row: 0, field: 'file', message: 'El archivo debe ser menor a 10MB' }]
        return
      }

      selectedFile.value = file
      await filesStore.uploadFile(file)
      selectedFile.value = null
    }

    const handleDownload = async (fileId: string, filename: string) => {
      await filesStore.downloadFile(fileId, filename)
    }

    const handleDelete = async (fileId: string) => {
      const result = await filesStore.deleteFile(fileId)
      if (!result.success && result.message) {
        filesStore.uploadError = [{ row: 0, field: 'file', message: result.message }]
      }
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('es-ES', {
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

    const onPageChange = (event: { page: number }) => {
      filesStore.setPage(event.page + 1)
    }

    const onSearch = () => {
      filesStore.fetchFiles()
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
      handleDownload,
      handleDelete,
      onDragOver,
      onDragLeave,
      onDrop,
      onFileSelect,
      formatDate,
      formatSize,
      clearErrors,
      onPageChange,
      onSearch,
      isAdmin: authStore.user?.role == 'ADMIN'
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">CSV Manager - Panel</h1>
        <div class="flex items-center gap-4">
          <span class="text-gray-600">{{ authStore.user?.email }}</span>
          <span class="text-sm text-gray-500">({{ authStore.user?.role }})</span>
          <Button label="Cerrar Sesión" severity="secondary" @click="handleLogout" />
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Subir Archivo CSV</h2>

        <div
          class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
          :class="isDragging ? 'border-primary bg-blue-50' : 'border-gray-300'"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
        >
          <i class="pi pi-upload text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-600 mb-4">
            Arrastre y suelte su archivo CSV aquí, o haga clic para seleccionar
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
              label="Seleccionar Archivo"
              severity="secondary"
              as="span"
              class="cursor-pointer"
            />
          </label>
          <p class="text-sm text-gray-400 mt-2">Tamaño máximo del archivo: 10MB</p>
        </div>

        <ProgressBar
          v-if="filesStore.loading && filesStore.uploadProgress > 0"
          :value="filesStore.uploadProgress"
          class="mt-4"
          :showValue="false"
        />

        <div v-if="selectedFile" class="mt-4 text-sm text-gray-600">
          Seleccionado: {{ selectedFile.name }} ({{ formatSize(selectedFile.size) }})
        </div>

        <div v-if="filesStore.uploadError" class="mt-4">
          <Message severity="error" @close="clearErrors">
            <strong>Carga Fallida:</strong>
          </Message>
          <div class="mt-2 bg-red-50 border border-red-200 rounded p-4 max-h-60 overflow-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left">
                  <th class="pr-4 pb-2">Fila</th>
                  <th class="pr-4 pb-2">Campo</th>
                  <th class="pb-2">Error</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(error, index) in filesStore.uploadError" :key="index" class="border-t border-red-100">
                  <td class="pr-4 py-2">{{ error.row || 'Archivo' }}</td>
                  <td class="pr-4 py-2 font-medium">{{ error.field }}</td>
                  <td class="py-2 text-red-600">{{ error.message }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="filesStore.uploadSuccess" class="mt-4">
          <Message severity="success" @close="clearErrors">
            ¡Archivo cargado exitosamente!
          </Message>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Sus Archivos CSV</h2>
          <div class="flex gap-2">
            <span class="p-input-icon-left">
              <InputText
                v-model="filesStore.searchQuery"
                placeholder="Buscar por nombre o usuario..."
                @keyup.enter="onSearch"
              />
            </span>
            <Button
              label="Buscar"
              severity="secondary"
              @click="onSearch"
            />
          </div>
        </div>

        <DataTable
          :value="filesStore.files"
          :loading="filesStore.loading"
          stripedRows
          class="w-full"
        >
          <Column field="name" header="Nombre del Archivo" sortable />
          <Column header="Tamaño" sortable sortField="size">
            <template #body="{ data }">
              {{ formatSize(data.size) }}
            </template>
          </Column>
          <Column field="uploadedBy" header="Subido Por" sortable />
          <Column header="Documentos">
            <template #body="{ data }">
              {{ data.documentCount || 0 }}
            </template>
          </Column>
          <Column field="createdAt" header="Fecha de Carga" sortable>
            <template #body="{ data }">
              {{ formatDate(data.createdAt) }}
            </template>
          </Column>
          <Column header="Acciones">
            <template #body="{ data }">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-download"
                  severity="secondary"
                  text
                  rounded
                  aria-label="Descargar"
                  v-tooltip.top="'Descargar'"
                  @click="handleDownload(data.id, data.name)"
                />
                <Button
                  v-if="isAdmin"
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  rounded
                  aria-label="Eliminar"
                  v-tooltip.top="'Eliminar'"
                  @click="handleDelete(data.id)"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <div v-if="!filesStore.loading && filesStore.files.length === 0" class="text-center py-8">
          <p class="text-gray-500">No se encontraron archivos.</p>
        </div>

        <Paginator
          v-if="filesStore.pagination.totalPages > 1"
          :rows="filesStore.pagination.limit"
          :totalRecords="filesStore.pagination.total"
          :first="(filesStore.pagination.page - 1) * filesStore.pagination.limit"
          @page="onPageChange"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          class="mt-4"
        />

        <div v-if="filesStore.pagination.total > 0" class="text-sm text-gray-500 text-center mt-2">
          Mostrando {{ (filesStore.pagination.page - 1) * filesStore.pagination.limit + 1 }} a
          {{ Math.min(filesStore.pagination.page * filesStore.pagination.limit, filesStore.pagination.total) }}
          de {{ filesStore.pagination.total }} entradas
        </div>
      </div>
    </div>
  </div>
</template>
