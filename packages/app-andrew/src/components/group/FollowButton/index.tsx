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
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import { openLoginModal } from 'state'
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
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="follow-button"
    >
      <button
        className={styles.btn}
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
              <IoIosStar />
            </i>{' '}
            <span>Unfollow</span>
          </>
        )}
        {!state.isFollowing && (
          <>
            <i>
              <IoIosStarOutline />
            </i>{' '}
            <span>Follow</span>
          </>
        )}
      </button>
    </div>
  )
}
