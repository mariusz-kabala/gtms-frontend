import React, { useState } from 'react'
import { NextPage } from 'next'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { IUser, IGroup } from '@gtms/commons/models'
import { getRecentUsers, usersListQuery } from '@gtms/state-user'
import { getRecentGroups, groupsListQuery } from '@gtms/state-group'
// ui
import { Button } from '@gtms/ui/Button'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '@gtms/ui/Picture'
import { RecentlyCreatedGroups } from 'components/home/RecentlyCreatedGroups'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'
import styles from './appStyles.scss'

type HomePageProps = {
  namespacesRequired: readonly string[]
  users: IUser[]
  groups: IGroup[]
}

export const HomePage: NextPage<HomePageProps> = ({ users, groups }) => {
  const { t } = useTranslation('homePage')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className={styles.pageWrapper} data-testid="home-page">
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <InviteFriends />
        </Modal>
      )}
      <Picture
        additionalStyles={styles.ohnoimage}
        jpg={'/images/white-theme/spotted-bg.png'}
      />
      <div className={styles.wrapper}>
        <div className={cx(styles.section, styles.recentlyCreatedGroups)}>
          <Button
            additionalStyles={styles.btn}
            onClick={() => setIsModalOpen(true)}
            type="submit"
          >
            {t('btn')}
          </Button>
          <h2 className={styles.header}>{t('header')}</h2>
          <RecentlyCreatedGroups groups={groups} />
        </div>
        <div className={cx(styles.section, styles.recentlyRegisteredUsers)}>
          <h2 className={styles.header}>{t('header')}</h2>
          <RecentlyRegisteredUsers users={users} />
        </div>
      </div>
    </div>
  )
}

HomePage.getInitialProps = async () => {
  const [users, groups] = await Promise.all([
    getRecentUsers(0, 10)
      .then(() => {
        return usersListQuery.getAll()
      })
      .catch(() => {
        return []
      }),
    getRecentGroups(0, 18)
      .then(() => {
        return groupsListQuery.getAll()
      })
      .catch(() => []),
  ])
  return {
    namespacesRequired: ['homePage'],
    users,
    groups,
  }
}

export default HomePage
