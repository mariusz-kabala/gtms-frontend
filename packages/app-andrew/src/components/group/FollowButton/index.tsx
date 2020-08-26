import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import { IGroup } from '@gtms/commons/models'
import {
  followButtonState,
  followButtonState$,
  IFollowButtonState,
} from './state.query'
import {
  loadNotificationsSettings,
  followGroup,
  unfollowGroup,
} from '@gtms/state-notification'
import { SwitchWrapper } from '@gtms/ui/SwitchWrapper'
import { openLoginModal } from 'state'

export const FollowButton: FC<{ group: IGroup }> = ({ group }) => {
  const [state, setState] = useState<IFollowButtonState>(
    followButtonState(group.id)
  )

  useEffect(() => {
    state.isLogged && loadNotificationsSettings()
    const sub = followButtonState$(group.id).subscribe((value) =>
      setState(value)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (state.errorOccurred) {
    return null
  }

  return (
    <div className={styles.wrapper} data-testid="follow-button">
      <label>
        <SwitchWrapper
          onChange={(value) => {
            if (!state.isLogged) {
              return openLoginModal()
            }

            if (value) {
              return followGroup(group.id)
            }

            unfollowGroup(group.id)
          }}
          checked={state.isFollowing}
        />
        <span>Follow</span>
      </label>
    </div>
  )
}
