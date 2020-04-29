import { useEffect, useState } from 'react'
import { userQuery, init } from '@gtms/state-user'

export function useAuth(tokens?: {
  accessToken?: string
  refreshToken?: string
}): {
  isLogged: boolean
} {
  if (tokens && tokens.accessToken && tokens.refreshToken) {
    init(
      tokens as {
        accessToken: string
        refreshToken: string
      }
    )
  }

  const [isLogged, setIsLogged] = useState<boolean>(userQuery.isLogged())

  useEffect(() => {
    const syncLogout = () => (event: { key: string }) => {
      if (event.key === 'logout') {
        window.location.reload()
      }
    }

    const authSub = userQuery.isLogged$.subscribe((value) =>
      setIsLogged(!!value)
    )

    window.addEventListener('storage', syncLogout)

    return () => {
      authSub.unsubscribe()
      window.removeEventListener('storage', syncLogout)
    }
  }, [])

  return { isLogged }
}
