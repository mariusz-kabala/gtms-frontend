import React, { FC } from 'react'
import cx from 'classnames'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { getDisplayName } from '@gtms/commons/helpers'
import { UserAvatar } from '@gtms/ui/UserAvatar'
// styles
import styles from './styles.scss'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
  users: IUser[]
}> = ({ additionalStyles, users }) => {
  return (
    <ul
      className={cx(styles.users, additionalStyles)}
      data-testid="recently-registered-users"
    >
      {users.map((user) => (
        <li className={styles.user} key={`recent-user-${user.id}`}>
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={
              user.avatar &&
              user.avatar.status === FileStatus.ready &&
              user.avatar.files['200x200']
                ? user.avatar?.files['200x200']
                : { jpg: '//via.placeholder.com/200x200' }
            }
            size="md"
          />
          {(user.name || user.surname) && <span>{getDisplayName(user)}</span>}
        </li>
      ))}

      {/* @todo remove mocked more users  */}
      {users.map((user) => (
        <li className={styles.user} key={`recent-user-${user.id}`}>
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={
              user.avatar &&
              user.avatar.status === FileStatus.ready &&
              user.avatar.files['200x200']
                ? user.avatar?.files['200x200']
                : { jpg: '//via.placeholder.com/200x200' }
            }
            size="md"
          />
          {(user.name || user.surname) && <span>{getDisplayName(user)}</span>}
        </li>
      ))}

      {/* @todo remove mocked more users  */}
      {users.map((user) => (
        <li className={styles.user} key={`recent-user-${user.id}`}>
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={
              user.avatar &&
              user.avatar.status === FileStatus.ready &&
              user.avatar.files['200x200']
                ? user.avatar?.files['200x200']
                : { jpg: '//via.placeholder.com/200x200' }
            }
            size="md"
          />
          {(user.name || user.surname) && <span>{getDisplayName(user)}</span>}
        </li>
      ))}

      {/* @todo remove mocked more users  */}
      {users.map((user) => (
        <li className={styles.user} key={`recent-user-${user.id}`}>
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={
              user.avatar &&
              user.avatar.status === FileStatus.ready &&
              user.avatar.files['200x200']
                ? user.avatar?.files['200x200']
                : { jpg: '//via.placeholder.com/200x200' }
            }
            size="md"
          />
          {(user.name || user.surname) && <span>{getDisplayName(user)}</span>}
        </li>
      ))}
    </ul>
  )
}
