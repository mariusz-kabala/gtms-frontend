import React from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreate } from '../../components/group/GroupCreate'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'

export const GroupCreatePage: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')

  return (
    <div className={styles.wrapper} data-testid="group-create-page">
      <div>
        <h2>{t('header')}</h2>
        <p>{t('subheader')}</p>
        <GroupCreate />
      </div>
    </div>
  )
}

GroupCreatePage.getInitialProps = async (ctx: NextPageContext) => {
  if (!hasAuthSessionCookies(ctx)) {
    redirect('/login', ctx)
  }

  return { namespacesRequired: ['groupCreate'] }
}

export default GroupCreatePage
