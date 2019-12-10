import { useEffect } from 'react'
import { useAuth } from './auth'
import { Router } from 'i18n'
import { userQuery } from 'state/user'

const redirectToLogin = () =>
  Router.push({
    pathname: 'login',
  })

export function useCheckAccess({
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
  }, [roles, isInitialized])

  if (!isLogged && isInitialized) {
    redirectToLogin()
  }

  return { isInitialized }
}
