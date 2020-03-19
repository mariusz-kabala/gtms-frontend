import getConfig from 'next/config'

interface IParams<T> {
  values: T
  headers?: {
    [key: string]: string
  }
}

export const fetch =
  typeof window === 'undefined' ? require('node-fetch') : window.fetch

export const fetchJSON = <T, R>(
  url: string,
  params?: IParams<T>
): Promise<R> => {
  const { values = {}, headers = {} } = params || {}
  const options: RequestInit & { timeout?: number } = {}

  if (values instanceof Object && Object.keys(values).length > 0) {
    headers['Content-Type'] = 'application/json'

    options.body = JSON.stringify(values)
    options.method = 'POST'
    options.cache = 'no-cache'
  }

  options.headers = headers

  options.timeout = 5000

  return fetch(url, options)
    .then((response: Response) => {
      if (response.ok) {
        return response.json()
      }

      throw response
    })
    .then((data: R) => data)
}

export const makeApiUrl = (url: string): string => {
  const { API_URL, FE_API_URL } = getConfig()

  const baseURL = typeof window === 'undefined' ? API_URL : FE_API_URL

  return `${baseURL}/v1/${url}`
}
