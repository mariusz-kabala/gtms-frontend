import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreate } from '../../components/group/GroupCreate'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
// styles
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const GroupCreatePage: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')

  return (
    <div className={styles.pageWrapper} data-testid="group-create-page">
      <div className={styles.form}>
        <Picture
          additionalStyles={styles.image}
          jpg={'/images/white-theme/group-create.png'}
        />
        <h2 className={styles.header}>{t('header')}</h2>
        <p className={styles.desc}>{t('subheader')}</p>
        <GroupCreate />
      </div>
      <div className={styles.pageBg} />
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
