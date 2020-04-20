import React from 'react'
import styles from './styles.scss'
import { NextPage } from 'next'
import { Button } from '@gtms/ui/Button'
import { Navigation } from '@gtms/ui/Navigation'
import { PostCreate } from '@gtms/ui/PostCreate'
import { PostSingle } from '@gtms/ui/PostSingle'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { UserCard } from '@gtms/ui/UserCard'

const GroupPage: NextPage<{}> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <UserAvatar
          additionalStyles={styles.avatar}
          image="/images/temp_images/avatar-1.png"
        />
        <Navigation />
      </div>
      <div className={styles.content}>
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
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <div className={styles.grid}>
                <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
                <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
                <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
                <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
              </div>
            </div>
            <div>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <div className={styles.grid}>
                <UserCard image={'/images/temp_images/logo-sztab-3.png'} />
                <UserCard
                  image={'/images/temp_images/logo-uczymy-ratowac.png'}
                />
                <UserCard image={'/images/temp_images/logo-wielki-mecz.png'} />
                <UserCard image={'/images/temp_images/logo-zbc.png'} />
              </div>
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
    </div>
  )
}

export default GroupPage
