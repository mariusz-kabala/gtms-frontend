import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { NotificationSingle } from '../NotificationSingle'

export const NotificationsGlobal: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div
      data-testid={'notifications-global'}
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: true,
      })}
    >
      <NotificationSingle
        additionalStyles={styles.notification}
        text="3 new users in your group"
        icon={{ jpg: '/images/temp_images/questionMark.png' }}
      />
      <NotificationSingle
        additionalStyles={styles.notification}
        text="3 new users in your group"
        icon={{ jpg: '/images/temp_images/questionMark.png' }}
      />
      <NotificationSingle
        additionalStyles={styles.notification}
        text="3 new users in your group"
        icon={{ jpg: '/images/temp_images/questionMark.png' }}
      />
    </div>
  )
}
