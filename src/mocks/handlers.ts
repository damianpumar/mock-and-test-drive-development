import { http, HttpResponse } from 'msw'

interface User {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'María' }
]

export const handlers = [
  // GET request
  http.get<never, never, User[]>('/api/users', () => {
    return HttpResponse.json<User[]>([
      ...users
    ])
  }),

  // POST request
  http.post<never, User, User>('/api/users', async ({ request }) => {
    const newUser = await request.json()
    const id = users.length + 1
    const createdUser = { ...newUser, id }
    users.push(createdUser)

    return HttpResponse.json<User>(
      createdUser,
      { status: 201 }
    )
  }),

  // Simular error
  http.get('/api/error', () => {
    return HttpResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    )
  })
]
