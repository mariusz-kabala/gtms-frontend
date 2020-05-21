import React, { FC, useState, useEffect } from 'react'
import { NavigationDots as NavigationDotsUI } from '@gtms/ui/NavigationDots'
import { INavigationDotsProps, baseUIQuery } from 'queries'
import { loadMyGroups } from '@gtms/state-user'

export const NavigationDots: FC = () => {
  const [state, setState] = useState<INavigationDotsProps>(
    baseUIQuery.navigationDots()
  )

  useEffect(() => {
    const sub = baseUIQuery.navigationDots$.subscribe((values) => {
      setState(values)
    })

    return sub.unsubscribe
  }, [])

  useEffect(() => {
    if (state.isLogged && !state.isLoaded) {
      loadMyGroups()
    }
  }, [state])

  if (!state.isVisible) {
    return null
  }

  return <NavigationDotsUI groups={state.groups} />
}
