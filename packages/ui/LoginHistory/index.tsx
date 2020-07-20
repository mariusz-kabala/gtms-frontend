import React, { FC } from 'react'
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
          
      )}
    </div>
  )
}
