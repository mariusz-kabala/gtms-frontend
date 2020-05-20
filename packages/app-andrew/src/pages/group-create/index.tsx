import React from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreate } from '../../components/groups/GroupCreate'
import { userQuery } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'

export const GroupCreatePage: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')

  return (
    <div className={styles.wrapper} data-testid="group-create-page">
      <div className={styles.left}>
        <div>
          <h2>{t('header')}</h2>
          <p>{t('subheader')}</p>
          <GroupCreate />
        </div>
      </div>
      <div className={styles.right}>
        <img
          src="/images/polandrock/virtual-village-create.png"
          alt="group create image"
        />
      </div>
    </div>
  )
}

GroupCreatePage.getInitialProps = async (ctx: NextPageContext) => {
  if (!userQuery.isLogged()) {
    redirect('/login', ctx)
  }

  return { namespacesRequired: ['groupCreate'] }
}

export default GroupCreatePage
