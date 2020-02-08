import React from 'react'
import styles from './styles.scss'
import { NextPage } from 'next'
import { GroupList } from 'components/group/GroupList'
import { Navigation } from 'components/common/Navigation'
import { PostSingle } from 'components/common/PostSingle'
import { UsersList } from 'components/common/UsersList'
import { ZawolajAdnrzeja } from 'components/common/ZawolajAndrzeja'

export const GroupPage: NextPage<{}> = () => {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.temp}>
        <PostSingle />
        <PostSingle />
        <PostSingle />
        <PostSingle />
        <PostSingle />
      </div>
      <div className={styles.hide}>
        <div>
          <img src="https://images.pexels.com/photos/620335/pexels-photo-620335.jpeg" />
        </div>
        <div className={styles.content}>
          <div>
            <h2 className={styles.h2}>Ostatnio dodane</h2>
            <GroupList />
          </div>
          <div className={styles.templist}>
            <div>
              <h2 className={styles.h2}>Ostatnio dodane</h2>
              <UsersList />
            </div>
            <div>
              <h2 className={styles.h2}>Ostatnio dodane</h2>
              <ZawolajAdnrzeja />
            </div>
            <div>
              <h2 className={styles.h2}>Ostatnio dodane</h2>
              <ZawolajAdnrzeja />
            </div>
            <div>
              <h2 className={styles.h2}>Ostatnio dodane</h2>
              <ZawolajAdnrzeja />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

GroupPage.getInitialProps = async () => {
  return {
    namespacesRequired: ['commmon'],
  }
}

export default GroupPage
