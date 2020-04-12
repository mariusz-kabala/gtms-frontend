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
      data-testid="recently-registered-users"
    >
      <ul className={styles.users}>
        <li className={styles.user}>
          <UserAvatar
            image="/images/temp_images/logo-sztab-1.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Marty Mcfly</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/temp_images/logo-sztab-1.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Marty Mcfly</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/temp_images/logo-sztab-1.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Marty Mcfly</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/temp_images/logo-sztab-1.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Marty Mcfly</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/temp_images/logo-sztab-1.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Marty Mcfly</span>
        </li>
      </ul>
    </div>
  )
}

// /images/temp_images/logo-patrol-2.png
