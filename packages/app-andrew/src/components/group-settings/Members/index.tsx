import React, { FC, useState, useEffect } from 'react'
import {
  groupMembersQuery,
  IGroupMembers,
  getGroupMembers,
} from '@gtms/state-group'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
// ui
import { GoPlus } from 'react-icons/go'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Modal } from '@gtms/ui/Modal'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
// styles
import styles from './styles.scss'

const RECORDS_PER_PAGE = 25

export const MembersSettings: FC<{ group: IGroup }> = ({ group }) => {
  const [state, setState] = useState<IGroupMembers>(
    groupMembersQuery.getGroupMembers()
  )
  const [showInvite, setShowInvite] = useState(false)

  useEffect(() => {
    getGroupMembers(group.slug, 0, RECORDS_PER_PAGE)
    const sub = groupMembersQuery.getGroupMembers$.subscribe((values) =>
      setState(values)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="group-settings-members">
      {state.isLoading && <Spinner />}

      {!state.isLoading && state.errorOccured && (
        <ErrorWrapper>
          <h2>Error occured, try again later</h2>
        </ErrorWrapper>
      )}

      {!state.isLoading &&
        !state.errorOccured &&
        state.records.length === 0 && (
          <p>No member, you should start a group promotion bitch</p>
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
        <ul className={styles.membersList}>
          {state.records.map((user) => (
            <li className={styles.item} key={`group-admin-${user.id}`}>
              <Link href={`/user/${user.id}`}>
                <a>
                  <UserAvatar
                    image={getImage('200x200', user.avatar)}
                    size="100percent"
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
