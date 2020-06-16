import React, { FC, useState, useEffect } from 'react'
import { NavigationMain as NavigationMainUI } from '@gtms/ui/NavigationMain'
import { INavigationMainProps, baseUIQuery } from 'queries'
import { toggleSidebarNotifications } from 'state'
import { logoutUser } from '@gtms/state-user'

export const NavigationMain: FC<{}> = () => {
  const [state, setState] = useState<INavigationMainProps>(baseUIQuery.navigationMain())

  useEffect(() => {
    const sub = baseUIQuery.navigationMain$.subscribe((values) => setState(values))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.isLogged) {
    return null
  }

  return (
    <NavigationMainUI
      onAvatarClick={toggleSidebarNotifications}
      onLogout={logoutUser}
      avatar={state.userAvatar}
    />
  )
}
