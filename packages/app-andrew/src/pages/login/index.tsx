import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
// components
import { LoginContent } from '../../components/login/Content'

export const LoginPage: NextPage<{}> = () => {
  return <LoginContent />
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['login'] })
}

export default LoginPage
