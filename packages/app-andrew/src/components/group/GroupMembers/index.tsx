import React, { FC } from 'react'
import styles from './styles.scss'
import { IUser } from '@gtms/commons/models'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { UserAvatarNoImage } from 'enums'

export const GroupMembers: FC<{
  isLoading: boolean
  errorOccured: boolean
  users: IUser[]
}> = ({ isLoading, errorOccured, users }) => {
  return (
    <div data-testid="group-members" className={styles.wrapper}>
      {isLoading && <Spinner />}

      {errorOccured && <p>Sorry we can not show you groups members now</p>}

      {users.length > 0 && (
        <ul className={styles.users}>
          {users.map((user) => (
            <li key={`group-member-${user.id}`}>
              <Link href={`/user/${user.id}`}>
                <UserAvatar
                  additionalStyles={styles.avatar}
                  image={getImage('50x50', user.avatar, UserAvatarNoImage)}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {users.length === 0 && (
        <div className={styles.usersMock}>
         <UserAvatar
          additionalStyles={styles.avatar}
          image={{jpg: '/images/temp_images/avatar-1.png'}} />
         <UserAvatar
          additionalStyles={styles.avatar}
          image={{jpg: '/images/temp_images/avatar-1.png'}} />
         <UserAvatar
          additionalStyles={styles.avatar}
          image={{jpg: '/images/temp_images/avatar-1.png'}} />
         <UserAvatar
          additionalStyles={styles.avatar}
          image={{jpg: '/images/temp_images/avatar-1.png'}} />
          <p>No groups members, maybe you would like to be the first one?</p>
        </div>
      )}
    </div>
  )
}
