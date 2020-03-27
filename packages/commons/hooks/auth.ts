import { useEffect, useState } from 'react'
import { userQuery } from '@gtms/state-user'

export function useAuth(): {
  isLogged: boolean
} {
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
