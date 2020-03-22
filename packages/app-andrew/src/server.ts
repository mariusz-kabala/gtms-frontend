import express, { Request, Response } from 'express'
import next from 'next'
import nextI18NextMiddleware from 'next-i18next/middleware'
import nextI18next from '../../commons/i18n'

const isInProductionMode = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const app = next({ dev: !isInProductionMode })
const handle = app.getRequestHandler()
;(async () => {
  await app.prepare()
  const server = express()

  if (!isInProductionMode) {
    // eslint-disable-next-line
    const proxy = require('express-http-proxy')
    server.use('/api', proxy('http://localhost:9000'))
  }

  server.get('/logout', (req: Request, res: Response) => handle(req, res))

  server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req: Request, res: Response) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
