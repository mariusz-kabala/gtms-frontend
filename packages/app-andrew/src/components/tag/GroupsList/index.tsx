import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { Spinner } from '@gtms/ui/Spinner'

export const GroupsList: FC<{ records: IGroup[]; isLoading: boolean }> = ({
  records,
  isLoading,
}) => {
  return (
    <div data-testid="groups-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        records.length > 0 &&
        records.map((group) => (
          <div key={group.id}>
            <h1>Proper component is missing</h1>
            {JSON.stringify(group)}
          </div>
        ))}
      {!isLoading && records.length === 0 && <p>No groups found</p>}
    </div>
  )
}
