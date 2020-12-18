import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import { IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { UserAvatarNoImage } from 'enums'
// state
import { getGroupMembers } from '@gtms/state-group'
// ui
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Modal } from '@gtms/ui/Modal'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
// styles
import styles from './styles.scss'

export const GroupMembers: FC<{
  additionalStyles: string
  errorOccured: boolean
  isLoading: boolean
  users: IUser[]
  slug?: string
}> = ({ additionalStyles, errorOccured, isLoading, users, slug }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!errorOccured && !isLoading && users.length === 0 && slug) {
      getGroupMembers(slug, 0, 8)
    }
  }, [])

  return (
    <div
      data-testid="group-members"
      className={cx(styles.wrapper, additionalStyles)}
    >
      {isModalOpen && (
        <Modal
          additionalStyles={styles.modal}
          onClose={() => setIsModalOpen(false)}
        >
          <InviteFriends />
        </Modal>
      )}

      {isLoading && <Spinner size="sm" />}

      {errorOccured && (
        <ErrorWrapper>
          <h2>Sorry we can not show you groups members now</h2>
        </ErrorWrapper>
      )}

      {users.length > 0 && (
        <ul className={styles.items}>
          {users.map((user) => (
            <li className={styles.item} key={`group-member-${user.id}`}>
              <Link href={`/user/${user.id}`}>
                <a>
                  <UserAvatar
                    additionalStyles={styles.avatar}
                    size="100percent"
                    image={getImage('50x50', user.avatar, UserAvatarNoImage)}
                  />
                </a>
              </Link>
            </li>
          ))}
          <li
            className={cx(styles.item, styles.invite)}
            key={`group-member-invite}`}
          >
            <Button
              additionalStyles={styles.btnInvite}
              onClick={() => setIsModalOpen(true)}
            >
              +
            </Button>
          </li>
        </ul>
      )}

      {users.length === 0 && !isLoading && !errorOccured && <Spinner />}
    </div>
  )
}
