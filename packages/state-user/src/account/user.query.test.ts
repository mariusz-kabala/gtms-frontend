import { userStore, IUserStore, userQuery } from './index'

describe('User query', () => {
  beforeEach(() => {
    userStore.reset()
  })

  it('Should return true from hasData() as store has user id and email', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: false,
      id: 'fake-id',
      email: 'fake@email.address',
    }

    userStore.update(update)

    expect(userQuery.hasData()).toBe(true)
  })

  it('Should return false from hasData() as there is no email in user store', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      id: 'fake-id',
    }

    userStore.update(update)

    expect(userQuery.hasData()).toBe(false)
  })

  it('Should return true from isActive() as store has data and account is active', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      id: 'fake-id',
      email: 'fake@email.address',
    }

    userStore.update(update)

    expect(userQuery.isActive()).toBe(true)
  })

  it('Should return false from isActive() as account is NOT active', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: false,
      id: 'fake-id',
      email: 'fake@email.address',
    }

    userStore.update(update)

    expect(userQuery.isActive()).toBe(false)
  })

  it('Should return false from isActive() as store has no valid data', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      email: 'fake@email.address',
    }

    userStore.update(update)

    expect(userQuery.isActive()).toBe(false)
  })

  it('Should return true from hasSession() as store has access and refresh tokens', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: false,
      email: 'fake@email.address',
      session: {
        accessToken: {
          value: 'fake-value',
          expiresAt: 12,
        },
        refreshToken: {
          value: 'fake-value',
          expiresAt: 12,
        },
        createdAt: 10000,
      },
    }

    userStore.update(update)

    expect(userQuery.hasSession()).toBe(true)
  })

  it('Should return false from hasSession() as store has no session', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: false,
      email: 'fake@email.address',
    }

    userStore.update(update)

    expect(userQuery.hasSession()).toBe(false)
  })

  it('Should return true from isInitialized() as store is initialized', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
    }

    userStore.update(update)

    expect(userQuery.isInitialized()).toBe(true)
  })

  it('Should return false from isInitialized() as store is NOT initialized', () => {
    expect(userQuery.isInitialized()).toBe(false)
  })

  it('Should return true from isLogged() as account is active, not blocked, and session is valid', () => {
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

    userStore.update(update)

    expect(userQuery.isLogged()).toBe(true)
  })

  it('Should return false from isLogged() as account NOT active', () => {
    const now = new Date().getTime()

    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: false,
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

    userStore.update(update)

    expect(userQuery.isLogged()).toBe(false)
  })

  it('Should return false from isLogged() as account is blocked', () => {
    const now = new Date().getTime()

    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      isBlocked: true,
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

    userStore.update(update)

    expect(userQuery.isLogged()).toBe(false)
  })

  it('Should return false from isLogged() as session is invalid', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      isBlocked: false,
      email: 'fake@email.address',
    }

    userStore.update(update)

    expect(userQuery.isLogged()).toBe(false)
  })

  it('Should return false from isLogged() as session expired', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      isBlocked: false,
      email: 'fake@email.address',
      session: {
        accessToken: {
          value: 'fake-value',
          expiresAt: 6666,
        },
        refreshToken: {
          value: 'fake-value',
          expiresAt: 6666,
        },
        createdAt: 10000,
      },
    }

    userStore.update(update)

    expect(userQuery.isLogged()).toBe(false)
  })

  it('Should return true from hasRoles as the role is in the store and account is not blocked', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isBlocked: false,
      roles: ['test'],
    }

    userStore.update(update)

    expect(userQuery.hasRoles(['test'])).toBe(true)
  })

  it('Should return true from hasRoles as store has all required roles', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isBlocked: false,
      roles: ['test', 'test2'],
    }

    userStore.update(update)

    expect(userQuery.hasRoles(['test', 'test2'])).toBe(true)
  })

  it('Should return false from hasRoles as store has only one required role', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isBlocked: false,
      roles: ['test'],
    }

    userStore.update(update)

    expect(userQuery.hasRoles(['test', 'test2'])).toBe(false)
  })

  it('Should return false from hasRoles as store has no roles', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isBlocked: false,
      roles: [],
    }

    userStore.update(update)

    expect(userQuery.hasRoles(['test', 'test2'])).toBe(false)
  })

  it('Should return false from hasRoles as account is blocked', () => {
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isBlocked: true,
      roles: ['test', 'test2'],
    }

    userStore.update(update)

    expect(userQuery.hasRoles(['test', 'test2'])).toBe(false)
  })
})
