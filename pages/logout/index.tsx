import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { destroyCookie } from 'nookies'
import { logoutUser } from 'state/user'
import { Router } from 'i18n'

export const LogoutPage: NextPage<{}> = () => {
  useEffect(() => {
    logoutUser()
    Router.push({
      pathname: '/login',
    })
  }, [])

  return <div />
}

LogoutPage.getInitialProps = async (ctx: NextPageContext) => {
  destroyCookie(ctx, 'refreshToken')
  destroyCookie(ctx, 'accessToken')

  return Promise.resolve({ namespacesRequired: ['logout'] })
}

export default LogoutPage
