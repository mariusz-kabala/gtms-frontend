import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
// ui
import { UserAvatar } from '@gtms/ui/UserAvatar'
// styles
import styles from './styles.scss'

export const RecentlyRegisteredUsers: FC<{
  users: IUser[]
  noImage: { [key: string]: IImage }
  showUserPreview?: (user: IUser) => void
}> = ({ users, noImage, showUserPreview }) => {
  return (
    <ul className={styles.users} data-testid="recently-registered-users">
      {users.map((user) => (
        <li
          className={styles.user}
          key={`recent-user-${user.id}`}
          onClick={() => showUserPreview && showUserPreview(user)}
        >
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={getImage('200x200', user.avatar, noImage)}
            size="sm"
          />
          {(user.name || user.surname) && (
            <span className={styles.nameAndSurname}>
              {getDisplayName(user)}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
