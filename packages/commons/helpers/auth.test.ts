import { initAuthSession } from './auth'
import { FetchMock } from 'jest-fetch-mock'
import { parseCookies, setCookie } from 'nookies'
import { parseJwt } from './jwt'
import { NextPageContext } from 'next'
import { init } from '@gtms/state-user'

const fetchMock = fetch as FetchMock

jest.mock('nookies', () => ({
  parseCookies: jest.fn(),
  setCookie: jest.fn(),
}))

jest.mock('./jwt', () => ({
  parseJwt: jest.fn().mockImplementation(() => ({
    exp: 4000,
  })),
}))

jest.mock('@gtms/state-user', () => ({
  init: jest.fn(),
}))

describe('Auth helper', () => {
  beforeEach(() => {
    fetchMock.mockClear()
    ;(parseCookies as jest.Mock).mockClear()
    ;(setCookie as jest.Mock).mockClear()
    ;(init as jest.Mock).mockClear()
    ;(parseJwt as jest.Mock).mockClear()
  })

  it('Should return an empty object as refreshToken cookie does not exists', async () => {
    ;(parseCookies as jest.Mock).mockImplementation(() => ({}))

    const ctx = {} as NextPageContext

    expect(await initAuthSession(ctx)).toEqual({})
    expect(parseCookies).toBeCalledTimes(1)
    expect(parseCookies).toBeCalledWith(ctx)
  })

  it('Should init the store and return accessToken and refreshToken from cookie', async () => {
    const cookies = {
      refreshToken: 'fake-refreshToken',
      accessToken: 'fake-accessToken',
    }
    ;(parseCookies as jest.Mock).mockImplementation(() => cookies)

    const ctx = {} as NextPageContext

    expect(await initAuthSession(ctx)).toEqual(cookies)

    expect(init).toBeCalledTimes(1)
    expect(init).toBeCalledWith(cookies)
  })

  it('Should fetch a new accessToken if current one expired', async () => {
    ;(parseCookies as jest.Mock).mockImplementation(() => ({
      refreshToken: 'fake-refreshToken',
    }))
    fetchMock.mockResponse('{"accessToken": "fake-access-token"}')

    const ctx = {} as NextPageContext

    expect(await initAuthSession(ctx)).toEqual({
      refreshToken: 'fake-refreshToken',
      accessToken: 'fake-access-token',
    })

    expect(fetchMock).toBeCalledTimes(1)
    expect(parseJwt).toBeCalledTimes(1)
    expect(parseJwt).toBeCalledWith('fake-access-token')
    expect(setCookie).toBeCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/refresh-token')
    expect(fetchMock.mock.calls[0][1].body).toBe(
      '{"token":"fake-refreshToken"}'
    )

    expect(init).toBeCalledTimes(1)
    expect(init).toBeCalledWith({
      refreshToken: 'fake-refreshToken',
      accessToken: 'fake-access-token',
    })
  })

  it('Should return an empty object if fetching a new accessToken failed', async () => {
    ;(parseCookies as jest.Mock).mockImplementation(() => ({
      refreshToken: 'fake-refreshToken',
    }))
    fetchMock.mockReject(new Error('fake error'))

    const ctx = {} as NextPageContext

    expect(await initAuthSession(ctx)).toEqual({})
    expect(fetchMock).toBeCalledTimes(1)
    expect(parseJwt).not.toBeCalled()
    expect(setCookie).not.toBeCalled()
    expect(init).not.toBeCalled()
  })
})
