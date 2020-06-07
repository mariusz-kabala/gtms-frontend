import React, { FC, useState, useEffect } from 'react'
import { IGroup } from '@gtms/commons/models'
import {
  groupMembersQuery,
  IGroupMembers,
  getGroupMembers,
} from '@gtms/state-group'
import { Spinner } from '@gtms/ui/Spinner'

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
    <div data-testid="group-settings-members">
      {state.isLoading && <Spinner />}

      {!state.isLoading && state.errorOccured && (
        <p>Error occured, try again later</p>
      )}

      {!state.isLoading &&
        !state.errorOccured &&
        state.records.length === 0 && (
          <p>No member, you should start a group promotion bitch</p>
        )}
    </div>
  )
}
