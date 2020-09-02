import React, { FC, useState, useEffect } from 'react'
import {
  groupMembersQuery,
  IGroupMembers,
  getGroupMembers,
} from '@gtms/state-group'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { IGroup } from '@gtms/commons/models'
// ui
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import styles from './styles.scss'

const RECORDS_PER_PAGE = 25

export const MembersSettings: FC<{ group: IGroup }> = ({ group }) => {
  const [state, setState] = useState<IGroupMembers>(
    groupMembersQuery.getGroupMembers()
  )

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

      {!state.isLoading && !state.errorOccured && state.records.length > 0 && (
        <ul className={styles.membersList}>
          {state.records.map((user) => (
            <li className={styles.item} key={`group-admin-${user.id}`}>
              <UserAvatar image={getImage('200x200', user.avatar)} />
              <span className={styles.name}>{getDisplayName(user)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
