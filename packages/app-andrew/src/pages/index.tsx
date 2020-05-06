import React from 'react'
import { NextPage } from 'next'
import styles from './appStyles.scss'
import { useAuth } from '@gtms/commons/hooks/auth'
import { Link } from '@gtms/commons/i18n'
import { useTranslation } from '@gtms/commons/i18n'
import { Logout } from '@gtms/ui/Logout'
import { Button } from '@gtms/ui/Button'
import { RecentlyCreatedGroups } from '@gtms/ui/RecentlyCreatedGroups'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'

export const HomePage: NextPage<{}> = () => {
  const { t } = useTranslation('homePage')
  const { isLogged } = useAuth()

  return (
    <div className={styles.wrapper} data-testid="home-page">
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url('/images/temp_images/cover-image-girls.jpg')`,
        }}
      >
        <div className={styles.desc}>
          <h2 className={styles.header}>{t('header')}</h2>
          <p>{t('subheader')}</p>
          <Button additionalStyles={styles.btn} type="submit">
            {t('btn')}
          </Button>
        </div>
        <div className={styles.shadow} />
      </div>
      <section className={styles.recentPosts}>
        <h2 className={styles.header}>{t('header')}</h2>
        <RecentlyCreatedGroups />
      </section>
      <section>
        <h2 className={styles.header}>{t('Zaproś znajomych')}</h2>
        <RecentlyRegisteredUsers />
        <ul>
          <li>
            <Link href="/group/owsiak">Owsiak</Link>
          </li>
          <li>
            <Link href="/group/my-private-group">My Private group</Link>
          </li>
          <li>
            <Link href="/group/private-group">Private group</Link>
          </li>
        </ul>
        {isLogged && <p>USER HAS A VALID SESSION!!!</p>}
        {isLogged && <Logout />}
      </section>
    </div>
  )
}

HomePage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['homePage'] })
}

export default HomePage
