import React from 'react'
import styles from './styles.scss'
import { NextPage } from 'next'
import { Link } from '@gtms/commons/i18n'
import { useTranslation } from '@gtms/commons/i18n'
// import { Button } from '@gtms/ui/Button'
import { Navigation } from '@gtms/ui/Navigation'
import { PostCreate } from '@gtms/ui/PostCreate'
import { PostSingle } from '@gtms/ui/PostSingle'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { UserCardMini } from '@gtms/ui/UserCardMini'
import { GroupDescription } from '../../components/groups/GroupDescription'

const GroupPage: NextPage<{}> = () => {
  const { t } = useTranslation('groupPage')

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <Link href="/account">
          <UserAvatar
            additionalStyles={styles.avatar}
            image="/images/temp_images/avatar-1.png"
          />
        </Link>
        <Navigation />
      </div>
      <div className={styles.content}>
        <div className={styles.groupHeader}>
          <h2>{t('header')}</h2>
          <GroupDescription />
          {/* <Button additionalStyles={styles.btn} type="submit">
            Add Post
          </Button>
          <Button additionalStyles={styles.btn} type="submit">
            Zaproś znajomych
          </Button> */}
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            <section>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <div className={styles.grid}>
                <UserCardMini image={'/images/temp_images/logo-patrol-1.png'} />
                <UserCardMini image={'/images/temp_images/logo-patrol-2.png'} />
                <UserCardMini image={'/images/temp_images/logo-sztab-1.png'} />
                <UserCardMini image={'/images/temp_images/logo-sztab-2.png'} />
              </div>
            </section>
            <section>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <div className={styles.grid}>
                <UserCardMini image={'/images/temp_images/logo-sztab-3.png'} />
                <UserCardMini
                  image={'/images/temp_images/logo-uczymy-ratowac.png'}
                />
                <UserCardMini
                  image={'/images/temp_images/logo-wielki-mecz.png'}
                />
                <UserCardMini image={'/images/temp_images/logo-zbc.png'} />
              </div>
            </section>
          </div>
          <div className={styles.column}>
            <section>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <PostCreate additionalStyles={styles.postCreate} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
            </section>
          </div>
        </div>
        <div className={styles.column}>
          <h2 className={styles.header}>Ostatnio dodane posty</h2>
          <PostCreate additionalStyles={styles.postCreate} />
          <PostSingle additionalStyles={styles.post} />
          <PostSingle additionalStyles={styles.post} />
          <PostSingle additionalStyles={styles.post} />
          <PostSingle additionalStyles={styles.post} />
          <PostSingle additionalStyles={styles.post} />
          <PostSingle additionalStyles={styles.post} />
        </div>
      </div>
    </div>
  )
}

GroupPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['groupPage', 'postCreate'] })
}

export default GroupPage
