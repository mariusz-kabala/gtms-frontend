import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
import cx from 'classnames'
// ui
import { UserAvatar } from '@gtms/ui/UserAvatar'
// styles
import styles from './styles.scss'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
  users: IUser[]
  noImage: { [key: string]: IImage }
  showUserPreview?: (user: IUser) => void
}> = ({ additionalStyles, users, noImage, showUserPreview }) => {
  const tempMock = [...users, ...users, ...users]

  return (
    <ul
      className={cx(styles.users, additionalStyles)}
      data-testid="recently-registered-users"
    >
      {tempMock.map((user) => (
        <li
          className={styles.user}
          key={`recent-user-${user.id}`}
          onClick={() => showUserPreview && showUserPreview(user)}
        >
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={getImage('200x200', user.avatar, noImage)}
            size="xs"
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
