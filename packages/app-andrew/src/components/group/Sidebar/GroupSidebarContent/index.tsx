import React, { FC, useState, useEffect } from 'react'
// state
import {
  IGroupSidebarContentState,
  groupSidebarContentState,
  groupSidebarContentState$,
} from './state.query'
// components
import { FavsButton } from 'components/group/FavsButton'
import { FollowButton } from 'components/group/FollowButton'
import { JoinLeaveButton } from 'components/group/JoinLeaveButton'
import { SettingsButton } from 'components/group/SettingsButton'
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
    <div className={styles.wrapper}>
      <FavsButton additionalStyles={styles.favsButton} group={state.group} />
      <JoinLeaveButton
        additionalStyles={styles.joinLeaveButton}
        group={state.group}
      />
      <SettingsButton
        additionalStyles={styles.settingsButton}
        group={state.group}
      />
      <FollowButton
        additionalStyles={styles.followButton}
        group={state.group}
      />
    </div>
  )
}
