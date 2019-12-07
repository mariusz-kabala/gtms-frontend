import React from 'react'
import styles from './styles.scss'
import { NextPage } from 'next'
import { useAuth } from 'hooks/auth'
import { authOrRedirectToLogin } from 'server/auth'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { GroupList } from 'components/common/GroupList'
import { ImageHolder } from 'components/common/ImageHolder'
import { Logo } from 'components/common/Logo'
import { NavigationDot } from 'components/common/NavigationDot'
// import { TempPlaceholder } from 'components/common/TempPlaceholder'
import { PostSingle } from 'components/common/PostSingle'
import { Spinner } from 'components/common/Spinner'
import { UsersList } from 'components/common/UsersList'
import { ZawolajAdnrzeja } from 'components/common/ZawolajAndrzeja'

export const HomePage: NextPage<{
  accessToken?: string
  refreshToken?: string
}> = ({ accessToken, refreshToken }) => {
  const { isLogged } = useAuth(accessToken, refreshToken)

  return (
    <div style={{ display: 'flex' }}>
      <NavigationDot />
      <div className={styles.wrapper}>
        <AnimatedComponent additionalStyles={styles.logo}>
          <Logo />
          <Spinner />
        </AnimatedComponent>
        <div>
          {/* @todo remove it soon */}
          <h2 className={styles.header}>{isLogged ? 'hello' : 'hello'}</h2>
          <h2 className={styles.header}>Ostatnio dodane wioski</h2>
          <GroupList />
        </div>
        <div>
          <ul className={styles.columns}>
            <li>
              {/* <h2 className={styles.header}>Ostatnio dodane wioski</h2> */}
              <ImageHolder
                height100
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
          </ul>
        </div>
      </div>
    </div>
  )
}

HomePage.getInitialProps = authOrRedirectToLogin

export default HomePage
