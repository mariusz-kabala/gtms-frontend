import React, { FC, useState, useEffect } from 'react'
// state
import { postsQuery } from '@gtms/state-post'
// ui
import { GroupSidebar } from 'components/group/Sidebar'
import { SearchBar } from '@gtms/ui/SearchBar'
// styles
import styles from './styles.scss'

interface IGroupHeaderState {
  activeTags: string[]
  activeUsers: string[]
}

const getState = (value = postsQuery.getValue()) => ({
  activeTags: value.tags || [],
  activeUsers: value.users || [],
})

export const GroupHeader: FC<{}> = () => {
  const [state, setState] = useState<IGroupHeaderState>(getState)

  useEffect(() => {
    const sub = postsQuery.select().subscribe((value) => {
      setState(getState(value))
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.mainHeader} data-testid="group-header">
      <GroupSidebar />
      <SearchBar
        onTagAdd={() => null}
        onTagRemove={() => null}
        onLoadSuggestion={() => null}
        onQueryChange={() => null}
        onLoadSuggestionCancel={() => null}
        tags={state.activeTags || []}
        users={state.activeUsers}
      />
    </div>
  )
}
