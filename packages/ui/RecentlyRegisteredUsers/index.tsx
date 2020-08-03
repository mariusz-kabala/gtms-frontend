import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { UserAvatar } from '../UserAvatar'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { getDisplayName } from '@gtms/commons/helpers'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
  users: IUser[]
}> = ({ additionalStyles, users }) => {
  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      <ul
        className={cx(styles.users, additionalStyles)}
        data-testid="recently-registered-users"
      >
        {users.map((user) => (
          <li className={styles.user} key={`recent-user-${user.id}`}>
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
