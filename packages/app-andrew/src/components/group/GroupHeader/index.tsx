import React, { FC } from 'react'
// ui
import { GroupSidebar } from 'components/group/Sidebar'
import { SearchBar } from '@gtms/ui/SearchBar'
// styles
import styles from './styles.scss'

export const GroupHeader: FC<{ groupId: string }> = ({ groupId }) => {
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
