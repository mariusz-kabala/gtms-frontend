import React, { FC } from 'react'
import { format } from 'date-fns'
import { Spinner } from '../Spinner'
import { IActiveSession } from '@gtms/commons/models'

export const UserSessions: FC<{
  isLoading: boolean
  errorOccured: boolean
  sessions: IActiveSession[]
  onDeleteClick?: (id: string) => unknown
}> = ({ isLoading, errorOccured, sessions, onDeleteClick }) => {
  return (
    <div data-testid="user-sessions">
      {isLoading && <Spinner />}
      {!isLoading && errorOccured && (
        <p>
          Error occured, we can not show you now list of your active sessions
        </p>
      )}
      {!isLoading && !errorOccured && sessions.length === 0 && (
        <p>We have no info about your current sessions</p>
      )}
      {!isLoading && !errorOccured && sessions.length > 0 && (
        <table>
          <thead>
            <th>Created At</th>
            <th>IP Address</th>
            <th>User agent</th>
            <th>Destory session</th>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={`session-${session.id}`}>
                <td>
                  {session.createdAt &&
                    format(new Date(session.createdAt), 'HH:mm:ss dd.MM.yyyy')}
                </td>
                <td>{session.ipAddress}</td>
                <td>{session.userAgent}</td>
                <td>
                  <button
                    onClick={() => onDeleteClick && onDeleteClick(session.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
