import React, { FC, useState, useEffect } from 'react'
import { NavigationGroup as NavigationGroupUI } from '@gtms/ui/NavigationGroup'
import { INavigationGroupProps, baseUIQuery } from 'queries'
import { toggleSidebarNotifications } from 'state'
import { logoutUser } from '@gtms/state-user'

export const NavigationGroup: FC<{}> = () => {
  const [state, setState] = useState<INavigationGroupProps>(baseUIQuery.navigationGroup())

  useEffect(() => {
    const sub = baseUIQuery.navigationGroup$.subscribe((values) => setState(values))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.isLogged) {
    return null
  }

  return (
    <NavigationGroupUI
      onAvatarClick={toggleSidebarNotifications}
      onLogout={logoutUser}
      avatar={state.userAvatar}
    />
  )
}
