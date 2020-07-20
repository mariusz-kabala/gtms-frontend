import React, { FC } from 'react'
import { format } from 'date-fns'
import { Spinner } from '../Spinner'
import { ILoginHistory } from '@gtms/commons/models'

export const LoginHistory: FC<{
  history: ILoginHistory[]
  isLoading: boolean
  errorOccured: boolean
}> = ({ history, isLoading, errorOccured }) => {
  return (
    <div data-testid="login-history">
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {!isLoading && errorOccured && (
        <p>Can not fetch login history now. Try again later</p>
      )}
      {!isLoading && !errorOccured && history.length == 0 && (
        <p>We have no data about your login history</p>
      )}
      {!isLoading && !errorOccured && history.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ip address</th>
              <th>User agent</th>
            </tr>
          </thead>
          <tbody>
            {history.map((history, index) => (
              <tr key={`history-${index}`}>
                <td>{format(new Date(history.date), 'HH:mm:ss dd.MM.yyyy')}</td>
                <td>{history.ipAddress}</td>
                <td>{history.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
