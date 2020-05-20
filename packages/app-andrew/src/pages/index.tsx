import React, { useState } from 'react'
import { NextPage } from 'next'
import styles from './appStyles.scss'
import { useAuth } from '@gtms/commons/hooks/auth'
import { useTranslation } from '@gtms/commons/i18n'
import { IUser, IGroup } from '@gtms/commons/models'
import { Button } from '@gtms/ui/Button'
import { PolAndRock } from '@gtms/ui/PolAndRock'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Modal } from '@gtms/ui/Modal'
import { Logout } from '@gtms/ui/Logout'
import { RecentlyCreatedGroups } from '@gtms/ui/RecentlyCreatedGroups'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'
import { IoIosSearch } from 'react-icons/io'
import { getRecentUsers, recentUsersQuery } from '@gtms/state-user'
import { getRecentGroups, recentGroupsQuery } from '@gtms/state-group'

type HomePageProps = {
  namespacesRequired: readonly string[]
  users: IUser[]
  groups: IGroup[]
}

export const HomePage: NextPage<HomePageProps> = ({ users, groups }) => {
  const { t } = useTranslation('homePage')
  const { isLogged } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className={styles.wrapper} data-testid="home-page">
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <InviteFriends />
        </Modal>
      )}
      <PolAndRock />
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
      <section className={styles.recentPosts}>
        <h2 className={styles.header}>{t('header')}</h2>
        <RecentlyCreatedGroups groups={groups} />
      </section>
      <section>
        <h2 className={styles.header}>{t('Zaproś znajomych')}</h2>
        <RecentlyRegisteredUsers users={users} />
        {isLogged && <Logout />}
      </section>
    </div>
  )
}

HomePage.getInitialProps = async () => {
  const [users, groups] = await Promise.all([
    getRecentUsers(0, 10)
      .then(() => {
        return recentUsersQuery.getAll()
      })
      .catch(() => {
        return []
      }),
    getRecentGroups(0, 18)
      .then(() => {
        return recentGroupsQuery.getAll()
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
