import React from 'react'
import { NextPage } from 'next'
import { IUser, IGroup } from '@gtms/commons/models'
import { getRecentUsers, usersListQuery } from '@gtms/state-user'
import { getRecentGroups, groupsListQuery } from '@gtms/state-group'
import { showUserPreview } from '@app/state/userPreview'
import { UserAvatarNoImage } from '@app/enums'
import { RecentlyCreatedGroups } from '@app/components/home/RecentlyCreatedGroups'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'
// ui
import { FaUsers, FaUserShield, FaIdBadge } from 'react-icons/fa'
import { Button } from '@gtms/ui/Button'
import styles from './indexstyles.scss'

type HomePageProps = {
  groups: IGroup[]
  users: IUser[]
}

export const HomePage: NextPage<HomePageProps> = ({ groups, users }) => {
  return (
    <>
      <div data-testid="home-page" className={styles.pageWrapper}>
        <div className={styles.welcome}>
          <div className={styles.mainHeader}>
            <h2 className={styles.header}>
              Szukam<span className={styles.bold}>Andrzeja.pl</span>
              <span className={styles.subtitle}>
                Pierwsze festiwalowe spotted!
              </span>
            </h2>
            <ul className={styles.icons}>
              <li className={styles.element}>
                <i>
                  <FaUsers />
                </i>
                <span>Cupidatat aute voluptate anim exercitation</span>
              </li>
              <li className={styles.element}>
                <i>
                  <FaUserShield />
                </i>
                <span>Cupidatat aute voluptate anim exercitation</span>
              </li>
              <li className={styles.element}>
                <i>
                  <FaIdBadge />
                </i>
                <span>Cupidatat aute voluptate anim exercitation</span>
              </li>
              <li className={styles.element}>
                <i>
                  <FaUserShield />
                </i>
                <span>Cupidatat aute voluptate anim exercitation</span>
              </li>
            </ul>
            <Button additionalStyles={styles.btn}>
              Dołącz
              <span>Odnajdźmy razem Andrzeja! :(</span>
            </Button>
          </div>
          <div className={styles.recentlyRegisteredUsers}>
            <h3 className={styles.header}>Ostatnio dołączyli:</h3>
            <RecentlyRegisteredUsers
              noImage={UserAvatarNoImage}
              showUserPreview={showUserPreview}
              users={users}
            />
          </div>
        </div>
        <RecentlyCreatedGroups
          additionalStyles={styles.recentlyCreatedGroups}
          createYourOwnGroup={true}
          groups={groups}
        />
      </div>
      <div className={styles.pageBg} />
    </>
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
    users,
    groups,
  }
}

export default HomePage
