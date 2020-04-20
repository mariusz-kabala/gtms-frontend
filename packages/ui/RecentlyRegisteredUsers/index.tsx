import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { UserAvatar } from '../UserAvatar'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  {
    /* @this component is just a mock */
  }

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="RecentlyRegisteredUsers"
    >
      <div className={styles.user}>
        <UserAvatar
          image="https://www.bootdey.com/img/Content/avatar/avatar6.png"
          additionalStyles={styles.userAvatar}
        />
        <span>Marty Mcfly</span>
      </div>
    </div>
  )
}
