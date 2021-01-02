import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
// components
import { RegistrationContent } from '@app/components/registration/Content'

export const RegistrationPage: NextPage<{}> = () => {
  return <RegistrationContent />
}

RegistrationPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['registration'] })
}

export default RegistrationPage
