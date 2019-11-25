import { useEffect, useState } from 'react'
import { init } from 'state/user'
import { userQuery, IUserStore } from 'state/user'

export function useAuth(
  accessToken?: string,
  refreshToken?: string
): {
  isLogged: boolean
  isInitialized: boolean
} {
  let initialValues: Partial<IUserStore> = {
    isInitialized: false,
  }

  if (accessToken && refreshToken) {
    initialValues = init({ accessToken, refreshToken })
  }

  const now = new Date().getTime()

  const [isLogged, setIsLogged] = useState<boolean>(
    !!(
      initialValues.session &&
      ((initialValues.session.accessToken &&
        initialValues.session.accessToken.expiresAt &&
        initialValues.session.accessToken.expiresAt > now) ||
        (initialValues.session.refreshToken &&
          initialValues.session.refreshToken.expiresAt &&
          initialValues.session.refreshToken.expiresAt > now))
    )
  )
  const [isInitialized, setIsInitialized] = useState<boolean>(
    !!initialValues.isInitialized
  )

  useEffect(() => {
    const initSub = userQuery.isInitialized$.subscribe(value =>
      setIsInitialized(value)
    )
    const authSub = userQuery.isLogged$.subscribe(value => setIsLogged(!!value))

    return () => {
      authSub.unsubscribe()
      initSub.unsubscribe()
    }
  }, [])

  return { isLogged, isInitialized }
}
