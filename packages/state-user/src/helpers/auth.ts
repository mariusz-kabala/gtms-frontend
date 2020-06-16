import { NextPageContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { fetchNewToken, IJWT } from '@gtms/api-auth'
import { parseJwt } from '@gtms/commons/helpers/jwt'

export async function initAuthSession(
  ctx: NextPageContext
): Promise<{
  accessToken?: string
  refreshToken?: string
}> {
  const cookies = parseCookies(ctx)
  const refreshToken = cookies.refreshToken
  let accessToken = cookies.accessToken

  if (!refreshToken) {
    return {}
  }

  if (!accessToken) {
    try {
      accessToken = (await fetchNewToken({ token: refreshToken })).accessToken
      const parsedToken = parseJwt<IJWT>(accessToken)

      setCookie(ctx, 'accessToken', accessToken, {
        maxAge:
          (new Date(parsedToken.exp * 1000).getTime() - new Date().getTime()) /
          1000,
        path: '/',
      })
    } catch (err) {
      return {}
    }
  }

  return {
    accessToken,
    refreshToken,
  }
}

export function hasAuthSessionCookies(ctx: NextPageContext) {
  const cookies = parseCookies(ctx)
  const refreshToken = cookies.refreshToken
  const accessToken = cookies.accessToken

  return (
    typeof refreshToken === 'string' &&
    refreshToken !== '' &&
    typeof accessToken === 'string' &&
    accessToken !== ''
  )
}
