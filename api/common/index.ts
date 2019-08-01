interface IParams<T> {
  values: T
  headers?: {
    [key: string]: string
  }
}

export const fetchJSON = <T, R>(
  url: string,
  params?: IParams<T>
): Promise<R> => {
  const { values = {}, headers = {} } = params || {}
  const options: RequestInit = {}

  if (values instanceof Object && Object.keys(values).length > 0) {
    headers['Content-Type'] = 'application/json'

    options.body = JSON.stringify(values)
    options.method = 'POST'
    options.cache = 'no-cache'
  }

  options.headers = new Headers(headers)

  return fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      }

      throw response
    })
    .then((data: R) => data)
}

export const makeApiUrl = (url: string): string => `/api/v1/${url}`
