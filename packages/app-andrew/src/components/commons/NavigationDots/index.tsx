import React, { FC, useState, useEffect, useCallback } from 'react'
import { NavigationDots as NavigationDotsUI } from '@gtms/ui/NavigationDots'
import { NavigationDotsFullView } from '../NavigationDotsFullView'
import { INavigationDotsProps, baseUIQuery } from 'queries'
import { loadMyGroups, updateFavGroupsOrder } from '@gtms/state-user'
import { GroupAvatarNoImage } from 'enums'
import { IGroup } from '@gtms/commons/models'

export const NavigationDots: FC = () => {
  const [state, setState] = useState<INavigationDotsProps>(
    baseUIQuery.navigationDots()
  )

  useEffect(() => {
    const sub = baseUIQuery.navigationDots$.subscribe((values) => {
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

  const onOrderChangeCallback = useCallback((groups: IGroup[]) => {
    updateFavGroupsOrder(
      groups.map((group) => group.id),
      false
    )
  }, [])

  if (!state.isVisible) {
    return null
  }

  return (
    <NavigationDotsUI
      onOrderChange={onOrderChangeCallback}
      groups={state.groups}
      noImage={GroupAvatarNoImage}
    >
      <NavigationDotsFullView />
    </NavigationDotsUI>
  )
}
