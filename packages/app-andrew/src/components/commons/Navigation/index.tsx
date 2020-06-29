import React, { FC, useState, useEffect } from 'react'
import { Navigation as NavigationUI } from '@gtms/ui/Navigation'
import { INavigationProps, baseUIQuery } from 'queries'
import { toggleSidebarNotifications } from 'state'
import { logoutUser } from '@gtms/state-user'

export const Navigation: FC<{}> = () => {
  const [state, setState] = useState<INavigationProps>(baseUIQuery.navigation())

  useEffect(() => {
    const sub = baseUIQuery.navigation$.subscribe((values) => setState(values))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.isLogged) {
    return null
  }

  return (
    <NavigationUI
      onAvatarClick={toggleSidebarNotifications}
      onLogout={logoutUser}
      avatar={state.userAvatar}
    />
  )
}
