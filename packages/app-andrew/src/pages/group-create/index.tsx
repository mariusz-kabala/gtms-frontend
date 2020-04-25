import React from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreate } from '../../components/groups/GroupCreate'
import { initAuthSession } from '@gtms/commons/helpers/auth'
// import { userQuery } from '@gtms/state-user'
// import { redirect } from '@gtms/commons/helpers/redirect'

export const GroupCreatePage: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')

  return (
    <div className={styles.wrapper} data-testid="group-create-page">
      <div className={styles.left}>
        <div>
          <h2>{t('header')}</h2>
          <p>{t('desc')}</p>
          <GroupCreate />
        </div>
      </div>
      <div
        className={styles.right}
        style={{ backgroundImage: `url('/images/temp_images/group_bg_2.png')` }}
      />
    </div>
  )
}

GroupCreatePage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  // if (!userQuery.isLogged()) {
  //   redirect('/login', ctx)
  // }

  return Promise.resolve({ namespacesRequired: ['groupCreate'] })
}

export default GroupCreatePage
