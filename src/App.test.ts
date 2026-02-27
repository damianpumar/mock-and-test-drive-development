import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'
import App from './App.vue'
import { http, HttpResponse } from 'msw'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('User list', () => {
  it('should render users when component is mounted', async () => {
    const wrapper = mount(App)
    await flushPromises()

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
    expect(items[0]?.text()).toContain('Juan')
    expect(items[1]?.text()).toContain('María')
  })

  it('should display the ID next to the user name', async () => {
    const wrapper = mount(App)
    await flushPromises()

    const items = wrapper.findAll('li')
    expect(items[0]?.text()).toMatch(/ID: 1/)
    expect(items[1]?.text()).toMatch(/ID: 2/)
  })

  it('should show an error if loading fails', async () => {
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.json({ message: 'Error' }, { status: 500 })
      })
    )

    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.find('p').text()).toBe('Error loading users')
  })
})

describe('Create user', () => {
  it('should add a new user when the form is submitted', async () => {
    const wrapper = mount(App)
    await flushPromises()

    await wrapper.find('input').setValue('Pedro')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(3)
    expect(items[2]?.text()).toContain('Pedro')
  })

  it('should clear the input after creating a user', async () => {
    const wrapper = mount(App)
    await flushPromises()

    const input = wrapper.find('input')
    await input.setValue('Pedro')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('should disable the button when the input is empty', async () => {
    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('should enable the button when the input has text', async () => {
    const wrapper = mount(App)
    await flushPromises()

    await wrapper.find('input').setValue('New User')

    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('should show an error if creation fails', async () => {
    server.use(
      http.post('/api/users', () => {
        return HttpResponse.json({ message: 'Error' }, { status: 500 })
      })
    )

    const wrapper = mount(App)
    await flushPromises()

    await wrapper.find('input').setValue('Pedro')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('p').text()).toBe('Error creating user')
  })
})
