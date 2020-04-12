import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { UserAvatar } from '../UserAvatar'

export const RecentlyRegistered: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  {
    /* @this component is just a mock */
  }

  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      <div className={styles.user}>
        <UserAvatar
          image="/images/temp_images/logo-sztab-1.png"
          additionalStyles={styles.userAvatar}
        />
        <span>Marty Mcfly</span>
      </div>
      <div className={styles.user}>
        <UserAvatar
          image="/images/temp_images/logo-sztab-1.png"
          additionalStyles={styles.userAvatar}
        />
        <span>Marty Mcfly</span>
      </div>
      <div className={styles.user}>
        <UserAvatar
          image="/images/temp_images/logo-sztab-1.png"
          additionalStyles={styles.userAvatar}
        />
        <span>Marty Mcfly</span>
      </div>
    </div>
  )
}

// /images/temp_images/logo-patrol-2.png
