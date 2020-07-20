import React, { useState, useCallback, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'

type AccountSecurityPageProps = {
  namespacesRequired: readonly string[]
}

export const AccountSecurityPage: NextPage<AccountSecurityPageProps> = () => {
  return <div data-testid="account-security-page"></div>
}

AccountSecurityPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!hasAuthSessionCookies(ctx)) {
    redirect('/login', ctx)
  }

  return Promise.resolve({
    namespacesRequired: ['account'],
  })
}

export default AccountSecurityPage
