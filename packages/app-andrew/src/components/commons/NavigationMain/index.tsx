import React, { FC, useState, useEffect } from 'react'
import { NavigationMain as NavigationMainUI } from '@gtms/ui/NavigationMain'
import { INavigationMainProps, baseUIQuery } from 'queries'
import { loadMyGroups } from '@gtms/state-user'

export const NavigationMain: FC = () => {
  const [state, setState] = useState<INavigationMainProps>(
    baseUIQuery.navigationMain()
  )

  useEffect(() => {
    const sub = baseUIQuery.navigationMain$.subscribe((values) => {
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

  return <NavigationMainUI groups={state.groups} />
}
