import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { destroyCookie } from 'nookies'
import { logoutUser } from 'state/user'
import Router from 'next/router'
import { useTranslation } from 'i18n'

export const LogoutPage: NextPage<{}> = () => {
  const { i18n } = useTranslation('login')

  useEffect(() => {
    logoutUser()
    Router.push({
      pathname: i18n.language ? `/${i18n.language}/login` : '/login',
    })
  }, [i18n])

  return <div />
}

LogoutPage.getInitialProps = async (ctx: NextPageContext) => {
  destroyCookie(ctx, 'refreshToken')
  destroyCookie(ctx, 'accessToken')

  return Promise.resolve({ namespacesRequired: ['login'] })
}

export default LogoutPage
