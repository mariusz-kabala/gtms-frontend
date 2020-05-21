import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Notification } from '@gtms/ui/Notification'

export const NotificationsActive: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div
      data-testid={'notifications-global'}
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: true,
      })}
    >
      <Notification
        additionalStyles={styles.notification}
        text="3 new users in your group"
        icon={{ jpg: '/images/icons/iconCelebrate.png' }}
      />
      <Notification
        additionalStyles={styles.notification}
        text="3 new users in your group"
        icon={{ jpg: '/images/icons/iconExclamationMark.png' }}
      />
      <Notification
        additionalStyles={styles.notification}
        text="3 new users in your group"
        icon={{ jpg: '/images/icons/iconQuestionMark.png' }}
      />
    </div>
  )
}
