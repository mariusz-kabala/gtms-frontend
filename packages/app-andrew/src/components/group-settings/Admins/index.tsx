import React, { FC, useState, useEffect } from 'react'
import {
  IGroupAdmins,
  groupAdminsQuery,
  getGroupAdmins,
} from '@gtms/state-group'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { IGroup } from '@gtms/commons/models'
// ui
import { GoPlus } from 'react-icons/go'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import styles from './styles.scss'

export const AdminsSettings: FC<{ group: IGroup }> = ({ group }) => {
  const [state, setState] = useState<IGroupAdmins>(
    groupAdminsQuery.getGroupAdmins()
  )

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
      {state.isLoading && <Spinner />}

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

      {!state.isLoading && !state.errorOccured && state.records.length > 0 && (
        <ul className={styles.adminsList}>
          {state.records.map((user) => (
            <li className={styles.item} key={`group-admin-${user.id}`}>
              <UserAvatar image={getImage('200x200', user.avatar)} />
              <span className={styles.name}>{getDisplayName(user)}</span>
            </li>
          ))}
          <li key="add-new-admin">
            <button className={styles.btn} onClick={() => null}>
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
