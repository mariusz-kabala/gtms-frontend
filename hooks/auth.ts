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
    const syncLogout = () => (event: { key: string }) => {
      if (event.key === 'logout') {
        window.location.reload()
      }
    }

    const initSub = userQuery.isInitialized$.subscribe(value =>
      setIsInitialized(value)
    )
    const authSub = userQuery.isLogged$.subscribe(value => setIsLogged(!!value))

    window.addEventListener('storage', syncLogout)

    return () => {
      authSub.unsubscribe()
      initSub.unsubscribe()
      window.removeEventListener('storage', syncLogout)
    }
  }, [])

  return { isLogged, isInitialized }
}
