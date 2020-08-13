import React, { FC, useState, useEffect } from 'react'
import { userQuery } from '@gtms/state-user'
import { Navigation } from 'components/commons/Navigation'
import { NavigationDots } from 'components/commons/NavigationDots'
import styles from './styles.scss'

export const NavigationWrapper: FC<{}> = () => {
  const [isLogged, setIsLogged] = useState<boolean>(userQuery.isLogged)

  useEffect(() => {
    const sub = userQuery.isLogged$.subscribe((value) => setIsLogged(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  })

  if (!isLogged) {
    return null
  }

  return (
    <div
      className={styles.mainNavigationWrapper}
      data-testid="navigation-wrapper"
    >
      <Navigation />
      <NavigationDots />
    </div>
  )
}
