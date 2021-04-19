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
import { IoIosSearch } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import styles from './indexstyles.scss'

type HomePageProps = {
  groups: IGroup[]
  users: IUser[]
}

export const HomePage: NextPage<HomePageProps> = ({ groups, users }) => {
  return (
    <div data-testid="home-page" className={styles.pageWrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.logo}>
            Szukam<span className={styles.bold}>Andrzeja.pl</span>
            <span className={styles.subtitle}>
              Pierwsze festiwalowe spotted!
            </span>
          </h2>
          <div className={styles.search}>
            <i>
              <IoIosSearch />
            </i>
            <span>search...</span>
          </div>
          <Button additionalStyles={styles.btnJoin}>Dołącz</Button>
        </div>
        <div className={styles.slider}>
          <div className={styles.left}>
            <h2>W tym roku znajdziemy Andrzeja!</h2>
            <p>
              Dolor eiusmod sit adipisicing commodo veniam nisi. Incididunt
              labore aliquip nostrud deserunt irure. Proident cupidatat aliquip
              consectetur id. Reprehenderit nostrud enim laborum elit ut elit
              nulla aliqua.
            </p>
          </div>
          <div className={styles.right}></div>
        </div>
        {/* <ul className={styles.icons}>
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
        </ul>          */}
        <RecentlyCreatedGroups createYourOwnGroup={true} groups={groups} />
      </div>
      <div className={styles.recentlyRegisteredUsers}>
        <h3>Recently joined</h3>
        <p>Irure ea aliqua sunt ullamco exercitation.</p>
        <RecentlyRegisteredUsers
          additionalStyles={styles.users}
          noImage={UserAvatarNoImage}
          showUserPreview={showUserPreview}
          users={users}
        />
      </div>
      <div className={styles.user}>
        <img src="/images/temp/avatar.png" />
        <div className={styles.desc}>
          <h3>Piotr Nowak</h3>
          <p>
            Mollit adipisicing incididunt ipsum commodo non fugiat fugiat sint
            pariatur officia.
          </p>
          <p>
            Minim commodo enim non ad. Labore magna velit dolor sunt proident
            amet voluptate ex consectetur labore anim fugiat.
          </p>
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
    users,
    groups,
  }
}

export default HomePage
