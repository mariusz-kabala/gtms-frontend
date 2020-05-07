import React, { useState } from 'react'
import { NextPage } from 'next'
import styles from './appStyles.scss'
import { useAuth } from '@gtms/commons/hooks/auth'
import { useTranslation } from '@gtms/commons/i18n'
import { Link } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Modal } from '@gtms/ui/Modal'
import { Logout } from '@gtms/ui/Logout'
import { RecentlyCreatedGroups } from '@gtms/ui/RecentlyCreatedGroups'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'

export const HomePage: NextPage<{}> = () => {
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
      <div
        className={styles.banner}
        style={{backgroundImage: `url('/images/temp_images/cover-image-girls.jpg')`}}
      >
        <div className={styles.desc}>
          <h2 className={styles.header}>{t('header')}</h2>
          <p>{t('subheader')}</p>
          <Button 
            additionalStyles={styles.btn}
            onClick={() => setIsModalOpen(true)}
            type="submit">
            {t('btn')}
          </Button>
          <Link href="/login">
            <Button additionalStyles={styles.btn}>
              {t('bntLogin')}
            </Button>
          </Link>
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
        {isLogged && <Logout />}
      </section>
    </div>
  )
}

HomePage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['homePage'] })
}

export default HomePage
