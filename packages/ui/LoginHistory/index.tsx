import React, { FC } from 'react'
import { format } from 'date-fns'
import { ILoginHistory } from '@gtms/commons/models'
// ui
import { Spinner } from '@gtms/ui/Spinner'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import styles from './styles.scss'

export const LoginHistory: FC<{
  history: ILoginHistory[]
  isLoading: boolean
  errorOccured: boolean
}> = ({ history, isLoading, errorOccured }) => {
  return (
    <div className={styles.wrapper} data-testid="login-history">
      <h2 className={styles.header}>Login history</h2>
      {isLoading && <Spinner />}
      {!isLoading && errorOccured && (
        <ErrorWrapper>
          <h2>Can not fetch login history now. Try again later</h2>
        </ErrorWrapper>
      )}
      {!isLoading && !errorOccured && history.length == 0 && (
        <p>We have no data about your login history</p>
      )}
      {!isLoading && !errorOccured && history.length > 0 && (
        <ul className={styles.list}>
          {history.map((history, index) => (
            <li className={styles.item} key={`history-${index}`}>
              <div className={styles.row}>
                <div>
                  <h3 className={styles.header}>Date</h3>
                  {format(new Date(history.date), 'HH:mm:ss dd.MM.yyyy')}
                </div>
                <div>
                  <h3 className={styles.header}>IP address</h3>
                  {history.ipAddress}
                </div>
              </div>
              <div>
                <h3 className={styles.header}>User agent</h3>
                {history.userAgent}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
