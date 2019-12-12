import { NextPageContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { fetchNewToken } from 'api/auth'
import { parseJwt } from 'helpers/jwt'
import { IJWT } from 'api/auth'
import { init } from 'state/user'

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
        maxAge: new Date(parsedToken.exp * 1000).getTime(),
      })
    } catch (err) {
      return {}
    }
  }

  init({
    accessToken,
    refreshToken,
  })

  return {
    accessToken,
    refreshToken,
  }
}
