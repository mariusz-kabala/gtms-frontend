import getConfig from 'next/config'
import { userQuery } from '@gtms/state-user'

interface IParams<T> {
  values?: T
  signal?: AbortSignal
  addJWT?: boolean
  headers?: {
    [key: string]: string
  }
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export const fetch =
  typeof window === 'undefined' ? require('node-fetch') : window.fetch

export const makeApiUrl = (url: string): string => {
  const {
    publicRuntimeConfig: { API_URL, FE_API_URL },
  } = getConfig()

  const baseURL = typeof window === 'undefined' ? API_URL : FE_API_URL

  return `${baseURL}/v1/${url}`
}

export const fetchJSON = <T, R>(
  url: string,
  params?: IParams<T>,
  replay = false
): Promise<R> => {
  const { values = {}, headers = {}, addJWT = true, method } = params || {}
  const options: RequestInit & { timeout?: number } = {
    method: method || 'GET',
  }

  if (params?.signal) {
    options.signal = params.signal
  }

  if (values instanceof Object && Object.keys(values).length > 0) {
    headers['Content-Type'] = 'application/json'

    options.body = JSON.stringify(values)
    options.method = method || 'POST'
    options.cache = 'no-cache'
  }

  if (addJWT && userQuery.isLogged() && typeof window === 'undefined') {
    headers['x-access-token'] = userQuery.jwt() || ''
  }

  options.headers = headers

  options.timeout = 5000

  return fetch(url, options)
    .then(async (response: Response) => {
      if (response.ok) {
        return response.json().catch(() => {
          return null
        })
      }

      if (response.status === 401 && typeof window !== 'undefined') {
        const responseBody = await response.text()

        if (
          responseBody === 'Access token is invalid' &&
          replay === false &&
          userQuery.hasRefreshToken()
        ) {
          await fetch(makeApiUrl('auth/refresh-token'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: userQuery.getRefreshToken() }),
          })

          return await fetchJSON(url, params, true)
        }

        if (
          responseBody === 'Access token is invalid' &&
          (replay === true || !userQuery.hasRefreshToken())
        ) {
          return window.location.replace('/logout')
        }
      }

      throw response
    })
    .then((data: R) => data)
}

export const deleteRequest = (url: string, replay = false) => {
  const headers: {
    'x-access-token'?: string
  } = {}

  if (userQuery.isLogged() && typeof window === 'undefined') {
    headers['x-access-token'] = userQuery.jwt() || ''
  }

  return fetch(url, {
    method: 'DELETE',
    headers,
  })
    .then(async (response: Response) => {
      if (response.ok) {
        return response.json().catch(() => null)
      }

      if (response.status === 401 && typeof window !== 'undefined') {
        const responseBody = await response.text()

        if (
          responseBody === 'Access token is invalid' &&
          replay === false &&
          userQuery.hasRefreshToken()
        ) {
          await fetch(makeApiUrl('auth/refresh-token'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: userQuery.getRefreshToken() }),
          })

          return await deleteRequest(url, true)
        }

        if (
          responseBody === 'Access token is invalid' &&
          (replay === true || !userQuery.hasRefreshToken())
        ) {
          return window.location.replace('/logout')
        }
      }

      throw response
    })
    .then((data: any) => data)
}
