import React, { FC, useState, useEffect } from 'react'
import { NavigationGroup as NavigationGroupUI } from '@gtms/ui/NavigationGroup'
import { INavigationGroupProps, baseUIQuery } from 'queries'
import { loadMyGroups } from '@gtms/state-user'

export const NavigationGroup: FC = () => {
  const [state, setState] = useState<INavigationGroupProps>(
    baseUIQuery.navigationGroup()
  )

  useEffect(() => {
    const sub = baseUIQuery.navigationGroup$.subscribe((values) => {
      setState(values)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (state.isLogged && !state.isLoaded) {
      loadMyGroups()
    }
  }, [state])

  if (!state.isVisible) {
    return null
  }

  return <NavigationGroupUI groups={state.groups} />
}
