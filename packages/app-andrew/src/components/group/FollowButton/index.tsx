import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
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
import { AiOutlineRead, AiFillRead } from 'react-icons/ai'
import { openLoginModal } from '@app/state'
import styles from './styles.scss'

export const FollowButton: FC<{
  additionalStyles?: string
  group: IGroup
}> = ({ additionalStyles, group }) => {
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
    <button
      className={cx(styles.btn, additionalStyles)}
      data-testid="follow-button"
      onClick={() => {
        if (!state.isLogged) {
          return openLoginModal()
        }

        if (!state.isFollowing) {
          return followGroup(group.id)
        }

        unfollowGroup(group.id)
      }}
    >
      {state.isFollowing && (
        <>
          <i>
            <AiOutlineRead />
          </i>{' '}
          <span>Unfollow</span>
        </>
      )}
      {!state.isFollowing && (
        <>
          <i>
            <AiFillRead />
          </i>{' '}
          <span>Follow</span>
        </>
      )}
    </button>
  )
}
