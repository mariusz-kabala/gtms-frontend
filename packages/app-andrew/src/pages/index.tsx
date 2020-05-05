import React from 'react'
import { NextPage } from 'next'
import styles from './appStyles.scss'
import { useAuth } from '@gtms/commons/hooks/auth'
import { Link } from '@gtms/commons/i18n'
import { useTranslation } from '@gtms/commons/i18n'
import { Logout } from '@gtms/ui/Logout'
import { Button } from '@gtms/ui/Button'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'
import { UserCardMini } from '@gtms/ui/UserCardMini'

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
        <h2 className={styles.header}>Ostatnio dodane posty</h2>
        <div className={styles.grid}>
          <UserCardMini
            name="Wioska Andrzeja"
            image={'/images/temp_images/logo-wioska-1.png'}
          />
          <UserCardMini
            name="Kurwa Moje Pole"
            image={'/images/temp_images/logo-wioska-2.png'}
          />
          <UserCardMini
            name="Wioska Lecha"
            image={'/images/temp_images/logo-wioska-3.png'}
          />
          <UserCardMini
            name="Wioska Onet.pl"
            image={'/images/temp_images/logo-wioska-4.png'}
          />
          <UserCardMini
            name="Wioska Zgon Town"
            image={'/images/temp_images/logo-wioska-5.png'}
          />
          <UserCardMini
            name="Ministerstwo Wódki"
            image={'/images/temp_images/logo-wioska-6.png'}
          />
          <UserCardMini
            name="Wioska Krishny"
            image={'/images/temp_images/logo-wioska-7.png'}
          />
          <UserCardMini
            name="Wioska Playa"
            image={'/images/temp_images/logo-wioska-8.png'}
          />
          <UserCardMini
            name="Wioska Allegro"
            image={'/images/temp_images/logo-wioska-9.png'}
          />
          <UserCardMini
            name="Narniostock"
            image={'/images/temp_images/logo-wioska-10.png'}
          />
          <UserCardMini
            name="Kurwa Moje Pole"
            image={'/images/temp_images/logo-wioska-11.png'}
          />
          <UserCardMini
            name="Wioska Onet.pl"
            image={'/images/temp_images/logo-patrol-1.png'}
          />
          <UserCardMini
            name="Wioska Krishny"
            image={'/images/temp_images/logo-patrol-2.png'}
          />
          <UserCardMini
            name="Ministerstwo Wódki"
            image={'/images/temp_images/logo-sztab-1.png'}
          />
          <UserCardMini
            name="Wioska Lecha"
            image={'/images/temp_images/logo-sztab-2.png'}
          />
          <UserCardMini
            name="Wioska Zgon Town"
            image={'/images/temp_images/logo-sztab-3.png'}
          />
          <UserCardMini
            name="Wioska Allegro"
            image={'/images/temp_images/logo-uczymy-ratowac.png'}
          />
          <UserCardMini
            name="Wioska MAstercard"
            image={'/images/temp_images/logo-wielki-mecz.png'}
          />
        </div>
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
