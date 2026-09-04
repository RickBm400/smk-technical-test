import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignUpView from '@/features/auth/views/SignUpView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: { template: '<div>Login</div>' } },
    { path: '/signup', name: 'signup', component: SignUpView },
    { path: '/dashboard', name: 'dashboard', component: { template: '<div>Dashboard</div>' } }
  ]
})

describe('SignUpView', () => {
  it('renders registration form with all fields', () => {
    const wrapper = mount(SignUpView, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.findAll('input').length).toBeGreaterThanOrEqual(2)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows validation error for password mismatch', async () => {
    const wrapper = mount(SignUpView, {
      global: {
        plugins: [router]
      }
    })

    const inputs = wrapper.findAll('input')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]
    const confirmPasswordInput = inputs[2]

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')
    await confirmPasswordInput.setValue('differentpassword')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Las contraseñas no coinciden')
  })

  it('shows validation error for short password', async () => {
    const wrapper = mount(SignUpView, {
      global: {
        plugins: [router]
      }
    })

    const inputs = wrapper.findAll('input')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('123')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('La contraseña debe tener al menos 6 caracteres')
  })
})
