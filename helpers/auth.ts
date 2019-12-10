import { NextPageContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { fetchNewToken } from 'api/auth'
import { parseJwt } from 'helpers/jwt'
import { IJWT } from 'api/auth'
import { init } from 'state/user'
import { Router } from 'i18n'

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

export function redirectToLogin(ctx: NextPageContext) {
  if (ctx.res) {
    setCookie(ctx, 'redirectTo', ctx.pathname, {})

    ctx.res.writeHead(302, {
      Location: '/login',
    })

    ctx.res.end()
  } else {
    Router.push({
      pathname: '/login',
    })
  }
}
