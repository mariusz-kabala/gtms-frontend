import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import styles from './styles.scss'

export const GroupMembers: FC<{
  isLoading: boolean
  errorOccured: boolean
  users: IUser[]
}> = ({ isLoading, errorOccured, users }) => {
  return (
    <div data-testid="group-members" className={styles.wrapper}>
      <header>
        <h2>Czlonkowie grupy</h2>
        <ul>
          <li>Najnowsi</li>
          <li>Bardzo aktywni</li>
          <li>Zobacz wszystkich</li>
        </ul>
      </header>

      {isLoading && <Spinner />}

      {errorOccured && (
        <p className={styles.center}>
          Sorry we can not show you groups members now
        </p>
      )}

      {users.length > 0 && (
        <ul className={styles.users}>
          {users.map((user) => (
            <li className={styles.item} key={`group-member-${user.id}`}>
              <Link href={`/user/${user.id}`}>
                <UserAvatar additionalStyles={styles.avatar} image={getImage('200x200', user.avatar)} />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {users.length === 0 && (
        <p className={styles.center}>
          No groups members, maybe you would like to be the first one?
        </p>
      )}
    </div>
  )
}
