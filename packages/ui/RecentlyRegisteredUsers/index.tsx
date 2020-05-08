import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Modal } from '@gtms/ui/Modal'
import { UserAvatar } from '../UserAvatar'
import { useTranslation } from '@gtms/commons/i18n'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('recentlyRegisteredUsersComponent')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <InviteFriends />
        </Modal>
      )}
      <div className={styles.invite}>
        <Button onClick={() => setIsModalOpen(true)}>{t('btn')}</Button>
      </div>
      <ul
        className={styles.users}
        data-testid="recently-registered-users"
      >
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-1.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Tim Cook</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-2.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Larry Ellison</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-3.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Sundar Pichai</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-4.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Johnatan Ive</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-5.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Bill Atkinson</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-6.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Bill Fernandez</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-7.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Brad Silvenberg</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-8.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Chris Espinosa</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-9.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Daniel Kotke</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image={{ jpg: '/images/avatars/avatar-10.png' }}
            additionalStyles={styles.userAvatar}
          />
          <span>Mike Markkula</span>
        </li>
      </ul>
    </div>
  )
}
