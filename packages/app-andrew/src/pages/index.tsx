import React from 'react'
import { NextPage } from 'next'
import styles from './appStyles.scss'
// import { useAuth } from '@gtms/commons/hooks/auth'
// import { Link } from '@gtms/commons/i18n'
// import { useTranslation } from '@gtms/commons/i18n'
// import { Logout } from '@gtms/ui/Logout'
import { Button } from '@gtms/ui/Button'
// import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'

export const HomePage: NextPage<{}> = () => {
  // const { t } = useTranslation('homePage')
  // const { isLogged } = useAuth()

  return (
    <div className={styles.wrapper} data-testid="home-page">
      <div className={styles.banner}>
        <div className={styles.frame}>
          <div className={styles.desc}>
            <h2>Dojedź na festiwal z JedziemyNa.pl</h2>
            <p>
              Elit excepteur id veniam ea consequat eu excepteur exercitation
              ullamco nisi sint elit Lorem irure. Exercitation laborum sit
              proident occaecat dolore pariatur esse tempor fugiat magna
              incididunt aliquip ullamco.
            </p>
            <Button type="submit" additionalStyles={styles.btn}>
              Add Post
            </Button>
            <Button type="submit" additionalStyles={styles.btn}>
              Zaproś znajomych
            </Button>
          </div>
        </div>
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: `url('/images/temp_images/cover-image.jpg')`,
          }}
        />
      </div>

      {/* <h2 className={styles.header}>{t('header')}</h2>
      <RecentlyRegisteredUsers />
      <Button additionalStyles={styles.btn}>See more</Button>
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

      Welcome to Next.js!
      {isLogged && <p>USER HAS A VALID SESSION!!!</p>}
      {isLogged && <Logout />} */}
    </div>
  )
}

// HomePage.getInitialProps = () => {
//   return Promise.resolve({ namespacesRequired: ['homePage'] })
// }

export default HomePage
