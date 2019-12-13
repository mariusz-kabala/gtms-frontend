import {
  init,
  registerUserAccount,
  loginUser,
  logoutUser,
  googleLoginUser,
  fbLoginUser,
} from './user.service'
import { userStore } from './user.store'
import { parseJwt } from 'helpers/jwt'
import { FetchMock } from 'jest-fetch-mock'

const fetchMock = fetch as FetchMock

jest.mock('helpers/jwt', () => ({
  parseJwt: jest.fn().mockImplementation(() => ({
    id: 'fake-id',
    name: 'fake-name',
    surname: 'fake-surname',
    email: 'fake-email',
    countryCode: 'fake-countryCode',
    languageCode: 'fake-languageCode',
    roles: 'fake-roles',
    isActive: 'fake-isActive',
    exp: 20,
  })),
}))

jest.mock('./user.store', () => ({
  userStore: {
    getValue: jest.fn(),
    update: jest.fn(),
  },
}))

describe('User service', () => {
  beforeEach(() => {
    ;(userStore.update as jest.Mock).mockReset()
    ;(parseJwt as jest.Mock).mockClear()
    fetchMock.mockClear()
  })

  it('Should return current store value if store was already initialized', () => {
    ;(userStore.getValue as jest.Mock).mockImplementationOnce(() => ({
      isInitialized: true,
      fakeValue: 'fake',
    }))

    expect(
      init({ accessToken: 'fake-value', refreshToken: 'fake-value' })
    ).toEqual({
      isInitialized: true,
      fakeValue: 'fake',
    })
  })

  it('Should decode access token and refresh token when initializing', () => {
    ;(userStore.getValue as jest.Mock).mockImplementationOnce(() => ({
      isInitialized: false,
    }))

    init({ accessToken: 'fake-value', refreshToken: 'fake-value' })

    const update = (userStore.update as jest.Mock).mock.calls[0][0]

    expect(parseJwt).toBeCalledTimes(2)
    expect(userStore.update).toBeCalledTimes(1)
    expect(update.isInitialized).toBe(true)
    expect(update.email).toBe('fake-email')
    expect(update).toHaveProperty('name')
    expect(update).toHaveProperty('surname')
    expect(update).toHaveProperty('email')
    expect(update).toHaveProperty('countryCode')
    expect(update).toHaveProperty('languageCode')
    expect(update).toHaveProperty('roles')
    expect(update).toHaveProperty('isActive')
    expect(update).toHaveProperty('session')
    expect(update.session).toHaveProperty('accessToken')
    expect(update.session).toHaveProperty('refreshToken')
    expect(update.session).toHaveProperty('createdAt')
  })

  it('Should update store with proper data after registration', async done => {
    const fakeData = {
      email: 'fake@email.address',
      password: 'fake',
      passwordConfirmation: 'password',
    }

    fetchMock.mockResponse(
      JSON.stringify({
        name: 'tester',
      })
    )

    await registerUserAccount(fakeData)

    expect(fetchMock).toBeCalledTimes(1)

    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(fakeData))
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/users')

    expect(userStore.update).toBeCalledTimes(1)
    expect(userStore.update).toBeCalledWith({
      name: 'tester',
      isBlocked: false,
      isActive: false,
      roles: [],
    })

    done()
  })

  it('Should update store with user data after login', async done => {
    fetchMock.mockResponse(
      JSON.stringify({
        accessToken: 'fake-token',
      })
    )
    const payload = {
      email: 'testing@dot.com',
      password: '1234',
    }
    await loginUser(payload)

    const update = (userStore.update as jest.Mock).mock.calls[0][0]

    expect(fetchMock).toBeCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/authenticate')
    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(payload))
    expect(userStore.update).toBeCalledTimes(1)
    expect(parseJwt).toBeCalledTimes(2)

    expect(update).toHaveProperty('name')
    expect(update).toHaveProperty('surname')
    expect(update).toHaveProperty('email')
    expect(update).toHaveProperty('countryCode')
    expect(update).toHaveProperty('languageCode')
    expect(update).toHaveProperty('roles')
    expect(update).toHaveProperty('isActive')
    expect(update).toHaveProperty('session')
    expect(update.session).toHaveProperty('accessToken')
    expect(update.session).toHaveProperty('refreshToken')
    expect(update.session).toHaveProperty('createdAt')

    done()
  })

  it('Should update store with user data after login with FB', async done => {
    fetchMock.mockResponse(
      JSON.stringify({
        accessToken: 'fake-token',
      })
    )
    const payload = {
      accessToken: 'FB-fake-token',
      id: 'FB-fake-id',
    }
    await fbLoginUser(payload)

    const update = (userStore.update as jest.Mock).mock.calls[0][0]

    expect(fetchMock).toBeCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/facebook')
    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(payload))
    expect(userStore.update).toBeCalledTimes(1)
    expect(parseJwt).toBeCalledTimes(2)

    expect(update).toHaveProperty('name')
    expect(update).toHaveProperty('surname')
    expect(update).toHaveProperty('email')
    expect(update).toHaveProperty('countryCode')
    expect(update).toHaveProperty('languageCode')
    expect(update).toHaveProperty('roles')
    expect(update).toHaveProperty('isActive')
    expect(update).toHaveProperty('session')
    expect(update.session).toHaveProperty('accessToken')
    expect(update.session).toHaveProperty('refreshToken')
    expect(update.session).toHaveProperty('createdAt')

    done()
  })

  it('Should update store with user data after login with Google', async done => {
    fetchMock.mockResponse(
      JSON.stringify({
        accessToken: 'fake-token',
      })
    )
    const payload = {
      accessToken: 'Google-fake-token',
      id: 'Google-fake-id',
    }
    await googleLoginUser(payload)

    const update = (userStore.update as jest.Mock).mock.calls[0][0]

    expect(fetchMock).toBeCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/google')
    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(payload))
    expect(userStore.update).toBeCalledTimes(1)
    expect(parseJwt).toBeCalledTimes(2)

    expect(update).toHaveProperty('name')
    expect(update).toHaveProperty('surname')
    expect(update).toHaveProperty('email')
    expect(update).toHaveProperty('countryCode')
    expect(update).toHaveProperty('languageCode')
    expect(update).toHaveProperty('roles')
    expect(update).toHaveProperty('isActive')
    expect(update).toHaveProperty('session')
    expect(update.session).toHaveProperty('accessToken')
    expect(update.session).toHaveProperty('refreshToken')
    expect(update.session).toHaveProperty('createdAt')

    done()
  })

  it('Should cleanup user store when logout', () => {
    logoutUser()

    expect(userStore.update).toBeCalledTimes(1)
    expect(userStore.update).toBeCalledWith({
      isInitialized: true,
    })
  })
})
