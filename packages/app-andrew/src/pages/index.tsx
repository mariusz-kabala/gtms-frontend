import React from 'react'
import { NextPage } from 'next'
import { IUser, IGroup } from '@gtms/commons/models'
import { getRecentUsers, usersListQuery } from '@gtms/state-user'
import { getRecentGroups, groupsListQuery } from '@gtms/state-group'
import { UserAvatarNoImage } from 'enums'
// ui
import { RecentlyCreatedGroups } from 'components/home/RecentlyCreatedGroups'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'
import styles from './indexstyles.scss'

type HomePageProps = {
  groups: IGroup[]
  users: IUser[]
}

export const HomePage: NextPage<HomePageProps> = ({ groups, users }) => {
  return (
    <div data-testid="home-page" className={styles.pageWrapper}>
      {/* <RecentlyRegisteredUsers
        noImage={UserAvatarNoImage}
        additionalStyles={styles.recentlyRegisteredUsers}
        users={users}
      /> */}
      <RecentlyCreatedGroups
        additionalStyles={styles.recentlyCreatedGroups}
        createYourOwnGroup={true}
        groups={groups}
      />
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
