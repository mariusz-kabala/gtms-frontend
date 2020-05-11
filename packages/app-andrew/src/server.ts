import express, { Request, Response } from 'express'
import next from 'next'
import nextI18NextMiddleware from 'next-i18next/middleware'
import nextI18next from '../../commons/i18n'

const { NODE_ENV, API_URL, PORT, USE_PROXY_SSL } = process.env

const isInProductionMode = NODE_ENV === 'production'
const port = PORT || 3000
const app = next({ dev: !isInProductionMode })
const handle = app.getRequestHandler()
;(async () => {
  await app.prepare()
  const server = express()

  if (!isInProductionMode) {
    // eslint-disable-next-line
    const proxy = require('express-http-proxy')

    server.use(
      '/api',
      proxy(API_URL, {
        limit: '10mb',
        https: USE_PROXY_SSL === '1' ? true : false,
        proxyReqPathResolver: (req: Request) => {
          return `/api${req.url}`
        },
      })
    )
  }

  server.get('/logout', (_: Request, res: Response) => {
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    res.redirect('/login')
  })

  server.get(
    '*',
    nextI18NextMiddleware(nextI18next),
    (req: Request, res: Response) => handle(req, res)
  )

  server.disable('x-powered-by')

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
