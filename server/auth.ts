import { NextPageContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { fetchNewToken } from 'api/auth'
import { parseJwt } from 'helpers/jwt'
import { IJWT } from 'api/auth'
import { init } from 'state/user'

function redirectToLogin(ctx: NextPageContext) {
  if (ctx.res) {
    setCookie(ctx, 'redirectTo', ctx.pathname, {})

    ctx.res.writeHead(302, {
      Location: '/login',
    })

    ctx.res.end()
  }

  return Promise.resolve({})
}

export async function authOrRedirectToLogin(ctx: NextPageContext): Promise<{}> {
  const cookies = parseCookies(ctx)
  const refreshToken = cookies.refreshToken
  let accessToken = cookies.accessToken

  if (!refreshToken) {
    return redirectToLogin(ctx)
  }

  if (!accessToken) {
    try {
      accessToken = (await fetchNewToken({ token: refreshToken })).accessToken
      const parsedToken = parseJwt<IJWT>(accessToken)

      setCookie(ctx, 'accessToken', accessToken, {
        maxAge: new Date(parsedToken.exp * 1000).getTime(),
      })
    } catch (err) {
      return redirectToLogin(ctx)
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
