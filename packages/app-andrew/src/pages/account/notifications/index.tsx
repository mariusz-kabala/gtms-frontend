import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { NotificationsSettings } from 'components/account/NotificationsSettings'
import { redirect } from '@gtms/commons/helpers/redirect'
import { hasAuthSessionCookies } from '@gtms/state-user'

type IAccountNotificationsPageProps = {
  namespacesRequired: readonly string[]
}

export const AccountNotificationsPage: NextPage<IAccountNotificationsPageProps> = () => {
  return (
    <div>
      <NotificationsSettings />
    </div>
  )
}

AccountNotificationsPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!hasAuthSessionCookies(ctx)) {
    redirect('/login', ctx)
  }

  return Promise.resolve({
    namespacesRequired: ['account'],
  })
}

export default AccountNotificationsPage
