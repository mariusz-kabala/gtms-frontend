import React from 'react'
import styles from './styles.scss'
import { NextPage } from 'next'
import { useAuth } from 'hooks/auth'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { GroupList } from 'components/common/GroupList'
import { ImageHolder } from 'components/common/ImageHolder'
import { Logo } from 'components/common/Logo'
import { Navigation } from 'components/common/Navigation'
import { NavigationDot } from 'components/common/NavigationDot'
import { PostSingle } from 'components/common/PostSingle'
import { Spinner } from 'components/common/Spinner'
import { UsersList } from 'components/common/UsersList'
import { ZawolajAdnrzeja } from 'components/common/ZawolajAndrzeja'
import { Logout } from 'components/common/Logout'

export const GroupPage: NextPage<{}> = () => {
  const { isLogged } = useAuth()

  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div>
        {/* @todo temporary */}
        <br />
        <br />
        <NavigationDot />
        <h2 className={styles.header}>Ostatnio dodane wioski</h2>
        <img
          style={{ maxWidth: '100%' }}
          src="/images/temp_images/templaceholders.png"
        />
        {/* @todo temporary */}
        <br /> <br />
        <div>
          <h2 className={styles.header}>Ostatnio dodane wioski</h2>
          <ul className={styles.columns}>
            <li>
              <PostSingle />
            </li>
            <li>
              <PostSingle />
            </li>
            <li>
              <PostSingle />
            </li>
            <li>
              <PostSingle />
            </li>
            <li>
              <PostSingle />
            </li>
          </ul>
        </div>
        {/* @todo temporary */}
        <br /> <br />
        <h2 className={styles.header}>Ostatnio dodane wioski</h2>
        <GroupList />
        {/* @todo temporary */}
        <br /> <br />
        <div>
          <ul className={styles.columns}>
            <li>
              {/* <h2 className={styles.header}>Ostatnio dodane wioski</h2> */}
              <ImageHolder
                fullHeight
                image={
                  'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
                }
              />
            </li>
            <li>
              {/* <h2 className={styles.header}>Najnowsi poszukiwacze Andrzeja</h2> */}
              <UsersList />
            </li>
            <li>
              {/* <h2 className={styles.header}>Zawołaj  Andrzeja</h2> */}
              <ZawolajAdnrzeja />
            </li>
          </ul>
        </div>
        {/* @todo temporary */}
        <br /> <br />
        {/* @todo temporary hide */}
        <div style={{ display: 'none' }}>
          <AnimatedComponent additionalStyles={styles.logo}>
            <Logo />
            <Spinner />
          </AnimatedComponent>
          {isLogged && <Logout />}
          <div>
            {/* @todo remove it soon */}
            <h2 className={styles.header}>{isLogged ? 'hello' : 'hello'}</h2>
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
