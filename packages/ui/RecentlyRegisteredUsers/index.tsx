import React, { FC, useState } from 'react'
import cx from 'classnames'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { getDisplayName } from '@gtms/commons/helpers'
// import { UserAvatarNoImage } from 'enums'
// ui
import { Modal } from '@gtms/ui/Modal'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { UserPreview } from '@gtms/ui/UserPreview'
// styles
import styles from './styles.scss'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
  users: IUser[]
}> = ({ additionalStyles, users }) => {
  const [userPreview, setUserPreview] = useState<IUser | undefined>()
  const mock1 = {
    '35x35': {
      jpg: '//via.placeholder.com/35x35',
    },
    '50x50': {
      jpg: '//via.placeholder.com/50x50',
    },
    '200x200': {
      jpg: '//via.placeholder.com/200x200',
    },
    '800x800': {
      jpg: '//via.placeholder.com/200x200',
    },
    '1300x1300': {
      jpg: '//via.placeholder.com/200x200',
    },
  }

  return (
    <>
      {userPreview && (
        <Modal onClose={() => setUserPreview(undefined)}>
          <UserPreview
            user={userPreview}
            // noUserAvatar={UserAvatarNoImage}
            noUserAvatar={mock1}
            onUserPostsClick={() => null}
          />
        </Modal>
      )}
      <ul
        className={cx(styles.users, additionalStyles)}
        data-testid="recently-registered-users"
      >
        {users.map((user) => (
          <li
            className={styles.user}
            key={`recent-user-${user.id}`}
            onClick={() => setUserPreview(user)}
          >
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
          <li
            className={styles.user}
            key={`recent-user-${user.id}`}
            onClick={() => setUserPreview(user)}
          >
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
          <li
            className={styles.user}
            key={`recent-user-${user.id}`}
            onClick={() => setUserPreview(user)}
          >
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
          <li
            className={styles.user}
            key={`recent-user-${user.id}`}
            onClick={() => setUserPreview(user)}
          >
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
    </>
  )
}
