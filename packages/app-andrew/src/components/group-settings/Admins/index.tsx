import React, { FC, useState, useEffect } from 'react'
import {
  IGroupAdmins,
  groupAdminsQuery,
  getGroupAdmins,
} from '@gtms/state-group'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { IGroup } from '@gtms/commons/models'
import { Link } from '@gtms/commons/i18n'
// ui
import { GoPlus } from 'react-icons/go'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Modal } from '@gtms/ui/Modal'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import styles from './styles.scss'

export const AdminsSettings: FC<{ group: IGroup }> = ({ group }) => {
  const [state, setState] = useState<IGroupAdmins>(
    groupAdminsQuery.getGroupAdmins()
  )
  const [showInvite, setShowInvite] = useState(false)

  useEffect(() => {
    getGroupAdmins(group.slug)
    const sub = groupAdminsQuery.getGroupAdmins$.subscribe((values) =>
      setState(values)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="group-settings-admins">
      {state.isLoading && <Spinner additionalStyles={styles.spinner} />}

      {!state.isLoading && state.errorOccured && (
        <ErrorWrapper>
          <h2>Error occured, try again later</h2>
        </ErrorWrapper>
      )}

      {!state.isLoading &&
        !state.errorOccured &&
        state.records.length === 0 && (
          <p>No admins, you can add a new admin for this group</p>
        )}

      {showInvite && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={() => setShowInvite(false)}
        >
          Invite friends here
        </Modal>
      )}

      {!state.isLoading && !state.errorOccured && state.records.length > 0 && (
        <ul className={styles.adminsList}>
          {state.records.map((user) => (
            <li className={styles.item} key={`group-admin-${user.id}`}>
              <Link href={`/user/${user.id}`}>
                <a>
                  <UserAvatar
                    size="100percent"
                    image={getImage('200x200', user.avatar)}
                  />
                  <span className={styles.name}>{getDisplayName(user)}</span>
                </a>
              </Link>
            </li>
          ))}
          <li className={styles.item} key="add-new-admin">
            <button className={styles.btn} onClick={() => setShowInvite(true)}>
              <i>
                <GoPlus />
              </i>
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
