import React, { FC } from 'react'
import cx from 'classnames'
import { IUser } from '@gtms/commons/models'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { UserAvatarNoImage } from 'enums'
import styles from './styles.scss'

export const GroupMembers: FC<{
  additionalStyles: string
  errorOccured: boolean
  isLoading: boolean
  users: IUser[]
}> = ({ additionalStyles, errorOccured, isLoading, users }) => {
  return (
    <div
      data-testid="group-members"
      className={cx(styles.wrapper, additionalStyles)}
    >
      {isLoading && <Spinner />}

      {errorOccured && <p>Sorry we can not show you groups members now</p>}

      {users.length > 0 && (
        <ul className={styles.users}>
          {users.map((user) => (
            <li key={`group-member-${user.id}`}>
              <Link href={`/user/${user.id}`}>
                <a>
                  <UserAvatar
                    additionalStyles={styles.avatar}
                    image={getImage('50x50', user.avatar, UserAvatarNoImage)}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {users.length === 0 && (
        <p>No groups members, maybe you would like to be the first one?</p>
      )}
    </div>
  )
}
