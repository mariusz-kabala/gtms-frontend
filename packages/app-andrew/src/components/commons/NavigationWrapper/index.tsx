import React, { FC, useState, useEffect } from 'react'
import { userQuery } from '@gtms/state-user'
import { Navigation } from 'components/commons/Navigation'
import { NavigationDots } from 'components/commons/NavigationDots'
// ui
import { SearchBar } from '@gtms/ui/SearchBar'
// styles
import styles from './styles.scss'

export const NavigationWrapper: FC<{}> = () => {
  const [isLogged, setIsLogged] = useState<boolean>(userQuery.isLogged)

  useEffect(() => {
    const sub = userQuery.isLogged$.subscribe((value) => setIsLogged(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  })

  return (
    <div
      className={styles.mainNavigationWrapper}
      data-testid="navigation-wrapper"
    >
      <img
        className={styles.logo}
        src="/images/temp-images/logo-burning-man.png"
      />
      <SearchBar
        additionalStyles={styles.searchBar}
        onTagAdd={() => null}
        onTagRemove={() => null}
        onLoadSuggestion={() => null}
        onQueryChange={() => null}
        onLoadSuggestionCancel={() => null}
        onUserRemove={() => null}
      />
      {isLogged && (
        <div className={styles.right}>
          <NavigationDots />
          <Navigation />
        </div>
      )}
    </div>
  )
}
