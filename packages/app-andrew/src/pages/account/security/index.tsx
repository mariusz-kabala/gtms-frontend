import React, { useState, useEffect, useCallback } from 'react'
import { NextPage, NextPageContext } from 'next'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import { ILoginHistory, IActiveSession } from '@gtms/commons/models'
import { LoginHistory } from '@gtms/ui/LoginHistory'
import { UserSessions } from '@gtms/ui/UserSessions'
import {
  fetchLoginHistoryAPI,
  fetchActiveSessionsAPI,
  deleteActiveSessionAPI,
} from '@gtms/api-auth'
import { addErrorNotification } from '@gtms/state-notification'

type AccountSecurityPageProps = {
  namespacesRequired: readonly string[]
}

export const AccountSecurityPage: NextPage<AccountSecurityPageProps> = () => {
  const [loginHistory, setLoginHistory] = useState<{
    history: ILoginHistory[]
    isLoading: boolean
    errorOccured: boolean
  }>({
    history: [],
    isLoading: true,
    errorOccured: false,
  })
  const [userSession, setUserSession] = useState<{
    sessions: IActiveSession[]
    isLoading: boolean
    errorOccured: boolean
  }>({
    sessions: [],
    isLoading: true,
    errorOccured: false,
  })

  const onDeleteSessionClick = useCallback((id: string) => {
    // todo display a confirmation here
    deleteActiveSessionAPI(id)
      .then(() => {
        setUserSession((data) => {
          const { sessions } = data
          const index = sessions.findIndex((session) => session.id === id)

          if (index > -1) {
            sessions.splice(index, 1)
          }

          return {
            sessions: [...sessions],
            isLoading: false,
            errorOccured: false,
          }
        })
      })
      .catch(() => addErrorNotification('Error occured, try again later'))
  }, [])

  useEffect(() => {
    fetchLoginHistoryAPI()
      .then((history) => {
        setLoginHistory({
          isLoading: false,
          errorOccured: false,
          history,
        })
      })
      .catch(() => {
        setLoginHistory({
          isLoading: false,
          errorOccured: true,
          history: [],
        })
      })
    fetchActiveSessionsAPI()
      .then((sessions) => {
        setUserSession({
          sessions,
          isLoading: false,
          errorOccured: false,
        })
      })
      .catch(() =>
        setUserSession({
          sessions: [],
          isLoading: false,
          errorOccured: true,
        })
      )
  }, [])
  return (
    <div data-testid="account-security-page">
      <LoginHistory {...loginHistory} />
      <UserSessions {...userSession} onDeleteClick={onDeleteSessionClick} />
    </div>
  )
}

AccountSecurityPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!hasAuthSessionCookies(ctx)) {
    redirect('/login', ctx)
  }

  return Promise.resolve({
    namespacesRequired: ['account'],
  })
}

export default AccountSecurityPage
