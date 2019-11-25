export function parseJwt<T>(token: string): T {
  const atob = typeof window !== 'undefined' ? window.atob : require('atob')

  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )

  return JSON.parse(jsonPayload)
}
