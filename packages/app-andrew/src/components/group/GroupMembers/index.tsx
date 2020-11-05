import React, { FC, useState } from 'react'
import cx from 'classnames'
import { IUser } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { UserAvatarNoImage } from 'enums'
// ui
import { IoMdArrowForward } from 'react-icons/io'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Button } from '@gtms/ui/Button'
import { MockUsers } from '@gtms/ui/MockData'
import { Modal } from '@gtms/ui/Modal'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import styles from './styles.scss'

export const GroupMembers: FC<{
  additionalStyles: string
  errorOccured: boolean
  isLoading: boolean
  users: IUser[]
}> = ({ additionalStyles, errorOccured, isLoading, users }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div
      data-testid="group-members"
      className={cx(styles.wrapper, additionalStyles)}
    >
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <InviteFriends />
        </Modal>
      )}

      {isLoading && <Spinner size="sm" />}

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
      <MockUsers additionalStyles={styles.mock} theme="dark" numberOfElements={4} />
      )}
    </div>
  )
}
