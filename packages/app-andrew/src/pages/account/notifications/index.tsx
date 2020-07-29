import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { NotificationsSettings } from 'components/account/NotificationsSettings'
import { redirect } from '@gtms/commons/helpers/redirect'
import { hasAuthSessionCookies } from '@gtms/state-user'
import styles from './styles.scss'

type IAccountNotificationsPageProps = {
  namespacesRequired: readonly string[]
}

export const AccountNotificationsPage: NextPage<IAccountNotificationsPageProps> = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <NotificationsSettings />
      </div>
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
