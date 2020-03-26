import React from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'
import { UserCard } from '@gtms/ui/UserCard'

export const GroupMembersPage: NextPage<{}> = () => {
  const { t } = useTranslation('groupMembers')

  return (
    <div className={styles.wrapper} data-testid="group-members-page">
      <h2 className={styles.header}>{t('ostatnio dołączyli')}</h2>
      <div className={styles.grid}>
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-1.png'} />
        <UserCard image={'/images/temp_images/logo-sztab-2.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-1.png'} />
        <UserCard image={'/images/temp_images/logo-patrol-2.png'} />
        <Button additionalStyles={styles.btn}>See more</Button>
      </div>
    </div>
  )
}

GroupMembersPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['groupMembers'] })
}

export default GroupMembersPage