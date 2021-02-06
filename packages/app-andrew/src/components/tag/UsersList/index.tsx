import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { getDisplayName } from '@gtms/commons/helpers'
// ui
import { MockData } from '@gtms/ui/MockData'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

export const UsersList: FC<{ records: IUser[]; isLoading: boolean }> = ({
  records,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper} data-testid="users-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        records.length > 0 &&
        records.map((user) => (
          // proper UI needs to be done here
          <div key={`user-${user.id}`}>{getDisplayName(user)}</div>
        ))}
      {!isLoading && records.length === 0 && (
        <MockData additionalStyles={styles.noRecords} numberOfElements={4} />
      )}
    </div>
  )
}
