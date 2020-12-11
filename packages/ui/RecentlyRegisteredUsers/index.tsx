import React, { FC, useState } from 'react'
import cx from 'classnames'
import { IUser } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
// ui
import { Modal } from '@gtms/ui/Modal'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { UserPreview } from '@gtms/ui/UserPreview'
// styles
import styles from './styles.scss'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
  users: IUser[]
  noImage: { [key: string]: IImage }
}> = ({ additionalStyles, users, noImage }) => {
  const [userPreview, setUserPreview] = useState<IUser | undefined>()

  return (
    <>
      {userPreview && (
        <Modal onClose={() => setUserPreview(undefined)}>
          <UserPreview
            user={userPreview}
            noUserAvatar={noImage}
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
              image={getImage('200x200', user.avatar, noImage)}
              size="md"
            />
            {(user.name || user.surname) && <span>{getDisplayName(user)}</span>}
          </li>
        ))}
      </ul>
    </>
  )
}
