import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '@/features/auth/views/LoginView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: { template: '<div>SignUp</div>' } },
    { path: '/dashboard', name: 'dashboard', component: { template: '<div>Dashboard</div>' } }
  ]
})

describe('LoginView', () => {
  it('renders email and password inputs', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('shows validation error for empty email', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('El email es requerido')
  })

  it('shows validation error for invalid email format', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })

    const emailInput = wrapper.find('input[type="email"]')
    await emailInput.setValue('invalid-email')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Formato de email inválido')
  })

  it('shows validation error for empty password', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })

    const emailInput = wrapper.find('input[type="email"]')
    await emailInput.setValue('test@example.com')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('La contraseña es requerida')
  })
})
