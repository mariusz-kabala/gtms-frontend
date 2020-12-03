import React, { FC, useState, useEffect } from 'react'
// ui
import { GroupSidebar } from 'components/group/Sidebar'
import { SearchBar } from '@gtms/ui/SearchBar'
// state
import { uiQuery, IGroupUI } from 'state'
// styles
import styles from './styles.scss'

export const GroupHeader: FC<{ groupId: string }> = ({ groupId }) => {
  const [state, setState] = useState<IGroupUI>(uiQuery.groupState(groupId))

  return (
    <div className={styles.mainHeader} data-testid="group-header">
      <GroupSidebar
        setShowPromoted={setShowPromoted}
        showPromoted={showPromoted}
        setShowUsers={setShowUsers}
        showUsers={showUsers}
      />
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
