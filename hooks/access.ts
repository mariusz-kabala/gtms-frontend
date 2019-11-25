import { useEffect } from 'react'
import { useAuth } from './auth'
import Router from 'next/router'
import { userQuery } from 'state/user'

const redirectToLogin = () =>
  Router.push({
    pathname: 'login',
  })

export function checkAccess({
  roles,
  accessToken,
  refreshToken,
}: {
  roles?: string
  accessToken?: string
  refreshToken?: string
}): { isInitialized: boolean } {
  const { isLogged, isInitialized } = useAuth(accessToken, refreshToken)

  useEffect(() => {
    if (!isInitialized || !Array.isArray(roles)) {
      return
    }

    const sub = userQuery.hasRoles(roles).subscribe(hasRoles => {
      if (!hasRoles && isInitialized) {
        redirectToLogin()
      }
    })

    return () => sub.unsubscribe()
  }, [roles])

  if (!isLogged && isInitialized) {
    redirectToLogin()
  }

  return { isInitialized }
}
