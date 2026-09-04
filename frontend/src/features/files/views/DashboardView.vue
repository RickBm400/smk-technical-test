<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Message from 'primevue/message'
import ProgressBar from 'primevue/progressbar'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import { useAuthStore } from '@/features/auth/stores/auth'
import { useFilesStore } from '@/features/files/stores/files'
import { formatDate, formatSize } from '@/shared/utils/format'
import { FILE_CONSTANTS } from '@/shared/constants'

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
  data() {
    return {
      isDragging: false,
      selectedFile: null as File | null
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    filesStore() {
      return useFilesStore()
    },
    isAdmin(): boolean {
      return this.authStore.user?.role === 'ADMIN'
    },
    showingFrom(): number {
      return (this.filesStore.pagination.page - 1) * this.filesStore.pagination.limit + 1
    },
    showingTo(): number {
      return Math.min(
        this.filesStore.pagination.page * this.filesStore.pagination.limit,
        this.filesStore.pagination.total
      )
    }
  },
  mounted() {
    this.authStore.fetchUser()
    this.filesStore.fetchFiles()
  },
  methods: {
    handleLogout() {
      this.authStore.logout()
      this.$router.push({ name: 'login' })
    },
    onDragOver(event: DragEvent) {
      event.preventDefault()
      this.isDragging = true
    },
    onDragLeave() {
      this.isDragging = false
    },
    onDrop(event: DragEvent) {
      event.preventDefault()
      this.isDragging = false

      const files = event.dataTransfer?.files
      if (files && files.length > 0) {
        this.handleFile(files[0])
      }
    },
    onFileSelect(event: Event) {
      const input = event.target as HTMLInputElement
      if (input.files && input.files.length > 0) {
        this.handleFile(input.files[0])
      }
    },
    async handleFile(file: File) {
      if (!file.name.endsWith('.csv')) {
        this.filesStore.setUploadError([{ row: 0, field: 'file', message: 'Solo se permiten archivos CSV' }])
        return
      }

      if (file.size > FILE_CONSTANTS.MAX_FILE_SIZE) {
        this.filesStore.setUploadError([{ row: 0, field: 'file', message: 'El archivo debe ser menor a 10MB' }])
        return
      }

      this.selectedFile = file
      await this.filesStore.uploadFile(file)
      this.selectedFile = null
    },
    async handleDownload(fileId: string, filename: string) {
      await this.filesStore.downloadFile(fileId, filename)
    },
    async handleDelete(fileId: string) {
      const result = await this.filesStore.deleteFile(fileId)
      if (!result.success && result.message) {
        this.filesStore.setUploadError([{ row: 0, field: 'file', message: result.message }])
      }
    },
    formatDate,
    formatSize,
    clearErrors() {
      this.filesStore.clearUploadState()
    },
    onPageChange(event: { page: number }) {
      this.filesStore.setPage(event.page + 1)
    },
    onSearch() {
      this.filesStore.fetchFiles()
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

        <div v-if="filesStore.pagination.total > 0 && filesStore.pagination.totalPages > 1" class="text-sm text-gray-500 text-center mt-2">
          Mostrando {{ showingFrom }} a {{ showingTo }} de {{ filesStore.pagination.total }} entradas
        </div>
      </div>
    </div>
  </div>
</template>
