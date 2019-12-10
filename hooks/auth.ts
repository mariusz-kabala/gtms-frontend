import { useEffect, useState } from 'react'
import { init } from 'state/user'
import { userQuery } from 'state/user'

export function useAuth(
  accessToken?: string,
  refreshToken?: string
): {
  isLogged: boolean
  isInitialized: boolean
} {
  if (accessToken && refreshToken) {
    init({ accessToken, refreshToken })
  }

  const [isLogged, setIsLogged] = useState<boolean>(userQuery.isLogged())
  const [isInitialized, setIsInitialized] = useState<boolean>(
    userQuery.isInitialized()
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
