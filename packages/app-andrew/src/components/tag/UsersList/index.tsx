import React, { FC } from 'react'
import { Spinner } from '@gtms/ui/Spinner'
import { IUser } from '@gtms/commons/models'
import { getDisplayName } from '@gtms/commons/helpers'

export const UsersList: FC<{ records: IUser[]; isLoading: boolean }> = ({
  records,
  isLoading,
}) => {
  return (
    <div data-testid="users-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        records.length > 0 &&
        records.map((user) => (
          // proper UI needs to be done here
          <div key={`user-${user.id}`}>{getDisplayName(user)}</div>
        ))}
      {!isLoading && records.length === 0 && <p>No users found</p>}
    </div>
  )
}
