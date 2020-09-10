import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
// state
import { toggleGroupSidebar } from 'state'
import {
  IGroupSidebarContentState,
  groupSidebarContentState,
  groupSidebarContentState$,
} from './state.query'
// components
import { FavsButton } from 'components/group/FavsButton'
import { FollowButton } from 'components/group/FollowButton'
import { GroupMembers } from 'components/group/GroupMembers'
import { JoinLeaveButton } from 'components/group/JoinLeaveButton'
import { SettingsButton } from 'components/group/SettingsButton'
// ui
import { Button } from '@gtms/ui/Button'
import { SearchBar } from '@gtms/ui/SearchBar'
import { IoMdGrid } from 'react-icons/io'
import { GoDatabase, GoGitCompare, GoRepoForked, GoGift } from 'react-icons/go'
// styles
import styles from './styles.scss'

export const GroupSidebarContent: FC<{}> = () => {
  const [state, setState] = useState<IGroupSidebarContentState>(
    groupSidebarContentState()
  )

  useEffect(() => {
    const sub = groupSidebarContentState$.subscribe((value) => {
      setState(value)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.group) {
    return null
  }

  return (
    <>
      <div className={styles.actionButtons}>
        <FavsButton group={state.group} />
        <JoinLeaveButton group={state.group} />
        <SettingsButton group={state.group} />
        <FollowButton group={state.group} />
      </div>
      <Button
        additionalStyles={cx(styles.btnTags, {
          [styles.active]: false,
        })}
        onClick={() => alert('how will this work?')}
      >
        <i>
          <IoMdGrid />
        </i>
        <span>Tags</span>
      </Button>
      <ul className={styles.navmock}>
        <li className={styles.item}>
          <i>
            <GoDatabase />
          </i>
          <span>Users</span>
        </li>
        <li className={styles.item}>
          <i>
            <GoGitCompare />
          </i>
          <span>Tags</span>
        </li>
        <li
          className={styles.item}
          onClick={() => state.group && toggleGroupSidebar(state.group.id)}
        >
          <i>
            <GoGift />
          </i>
          <span>Posts</span>
        </li>
        <li className={styles.item}>
          <i>
            <GoRepoForked />
          </i>
          <span>Settings</span>
        </li>
      </ul>
      <GroupMembers additionalStyles={styles.groupMembers} {...state.members} />
      <div className={styles.searchInput}>
        <div className={styles.search}>
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
      </div>
    </>
  )
}
