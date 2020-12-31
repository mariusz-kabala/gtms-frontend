import React, { FC, useState } from 'react'
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
  users: IUser[]
  noImage: { [key: string]: IImage }
}> = ({ users, noImage }) => {
  const [userPreview, setUserPreview] = useState<IUser | undefined>()

  const moreUsers = [...users, ...users, ...users, ...users]

  return (
    <>
      <style global jsx>{`
        body {
          padding-right: 200px;
        }
      `}</style>
      {userPreview && (
        <Modal onClose={() => setUserPreview(undefined)}>
          <UserPreview
            user={userPreview}
            noUserAvatar={noImage}
            onUserPostsClick={() => null}
          />
        </Modal>
      )}
      <ul className={styles.users} data-testid="recently-registered-users">
        {moreUsers.map((user) => (
          <li
            className={styles.user}
            key={`recent-user-${user.id}`}
            onClick={() => setUserPreview(user)}
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
    </>
  )
}
