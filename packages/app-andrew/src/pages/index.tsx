import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { IUser, IGroup } from '@gtms/commons/models'
import { RecentlyCreatedGroups } from 'components/home/RecentlyCreatedGroups'
import { getRecentUsers, usersListQuery } from '@gtms/state-user'
import { getRecentGroups, groupsListQuery } from '@gtms/state-group'
// ui
import { IoIosSearch } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Modal } from '@gtms/ui/Modal'
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
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <div>
            <h2 className={styles.header}>
              <IoIosSearch />
              {t('header')}
            </h2>
            <p>
              {t('subheaderone')}
              <Button
                additionalStyles={styles.btn}
                onClick={() => setIsModalOpen(true)}
                type="submit"
              >
                {t('btn')}
              </Button>
              {t('subheadertwo')}
            </p>
          </div>
        </div>
        <div className={styles.recentlyCreatedGroups}>
          <h2 className={styles.header}>{t('header')}</h2>
          <RecentlyCreatedGroups groups={groups} />
        </div>
        <div>
          <h2 className={styles.header}>{t('Zaproś znajomych')}</h2>
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
