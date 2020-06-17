import { renderHook, act } from '@testing-library/react-hooks'
import { userStore, IUserStore } from '../account/user.store'
import { useAuth } from './auth'

describe('useAuth hook', () => {
  beforeEach(() => {
    act(() => {
      userStore.reset()
    })
  })

  it('Should return isLogged == false as there is no data in store', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.isLogged).toBe(false)
  })

  it('Should return isLogged === true as user store has session', () => {
    const now = new Date().getTime()

    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      isBlocked: false,
      email: 'fake@email.address',
      session: {
        accessToken: {
          value: 'fake-value',
          expiresAt: now + 100,
        },
        refreshToken: {
          value: 'fake-value',
          expiresAt: now + 100,
        },
        createdAt: 10000,
      },
    }

    act(() => {
      userStore.update(update)
    })

    const { result } = renderHook(() => useAuth())

    expect(result.current.isLogged).toBe(true)
  })

  it('Should first return isLogged == false and after store update isLogged === true', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.isLogged).toBe(false)

    const now = new Date().getTime()

    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      isBlocked: false,
      email: 'fake@email.address',
      session: {
        accessToken: {
          value: 'fake-value',
          expiresAt: now + 100,
        },
        refreshToken: {
          value: 'fake-value',
          expiresAt: now + 100,
        },
        createdAt: 10000,
      },
    }

    act(() => {
      userStore.update(update)
    })

    expect(result.current.isLogged).toBe(true)
  })
})
