import React, { FC } from 'react'
import cx from 'classnames'
import { IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { UserAvatarNoImage } from 'enums'
// ui
import styles from './styles.scss'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { IoMdArrowForward } from 'react-icons/io'

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
        <>
          <h2 className={styles.header}>Recently joined</h2>
          <ul className={styles.items}>
            {users.map((user) => (
              <li className={styles.item} key={`group-member-${user.id}`}>
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
          <Link href={`/group-members`}>
            <button className={styles.btn}>
              show all users
              <i>
                <IoMdArrowForward />
              </i>
            </button>
          </Link>
        </>
      )}

      {users.length === 0 && (
        <p>No groups members, maybe you would like to be the first one?</p>
      )}
    </div>
  )
}
