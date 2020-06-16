import React, { FC, useState, useEffect } from 'react'
import { NavigationOooo as NavigationOoooUI } from '@gtms/ui/NavigationOooo'
import { INavigationOoooProps, baseUIQuery } from 'queries'
import { loadMyGroups } from '@gtms/state-user'

export const NavigationOooo: FC = () => {
  const [state, setState] = useState<INavigationOoooProps>(
    baseUIQuery.navigationOooo()
  )

  useEffect(() => {
    const sub = baseUIQuery.navigationOooo$.subscribe((values) => {
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

  return <NavigationOoooUI groups={state.groups} />
}
