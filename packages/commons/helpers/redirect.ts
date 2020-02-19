import { NextPageContext } from 'next'
import { Router } from '../i18n'

export function redirect(url: string, ctx?: NextPageContext): void {
  if (!ctx?.res) {
    Router.push({
      pathname: url,
    })
    return
  }

  ctx.res.writeHead(302, {
    Location: url,
  })

  ctx.res.end()
}
