import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
// ui
import { Spinner } from '@gtms/ui/Spinner'
import { MockData } from '@gtms/ui/MockData'
import styles from './styles.scss'

export const GroupsList: FC<{ records: IGroup[]; isLoading: boolean }> = ({
  records,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper} data-testid="groups-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        records.length > 0 &&
        records.map((group) => (
          <div key={group.id}>
            <h1>Proper component is missing</h1>
            {JSON.stringify(group)}
          </div>
        ))}
      {!isLoading && records.length === 0 && (
        <MockData additionalStyles={styles.noRecords} numberOfElements={4} />
      )}
    </div>
  )
}
