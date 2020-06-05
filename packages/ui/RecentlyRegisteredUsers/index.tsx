import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Modal } from '@gtms/ui/Modal'
import { UserAvatar } from '../UserAvatar'
import { useTranslation } from '@gtms/commons/i18n'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { getDisplayName } from '@gtms/commons/helpers'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
  users: IUser[]
}> = ({ additionalStyles, users }) => {
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
        className={cx(styles.users, additionalStyles)}
        data-testid="recently-registered-users"
      >
        {users.map((user) => (
          <li key={`recent-user-${user.id}`} className={styles.user}>
            <UserAvatar
              image={
                user.avatar &&
                user.avatar.status === FileStatus.ready &&
                user.avatar.files['200x200']
                  ? user.avatar?.files['200x200']
                  : { jpg: '//via.placeholder.com/200x200' }
              }
              additionalStyles={styles.userAvatar}
            />
            {(user.name || user.surname) && <span>{getDisplayName(user)}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
