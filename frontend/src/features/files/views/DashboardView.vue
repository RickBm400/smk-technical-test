<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useAuthStore } from '@/features/auth/stores/auth'

export default defineComponent({
  name: 'DashboardView',
  components: {
    Button
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    onMounted(async () => {
      await authStore.fetchUser()
    })

    const handleLogout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      authStore,
      handleLogout
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
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Your CSV Files</h2>
        <p class="text-gray-500">No files uploaded yet.</p>
      </div>
    </div>
  </div>
</template>
