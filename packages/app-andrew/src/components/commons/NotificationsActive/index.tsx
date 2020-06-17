import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { NotificationLabel } from '@gtms/ui/NotificationLabel'
import {
  notificationsQuery,
  INotificationLabel,
  markAsRead,
} from '@gtms/state-notification'
import { NotificationIcons } from 'enums'

export const NotificationsActive: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [notifications, setNotifications] = useState<INotificationLabel[]>(
    notificationsQuery.unread()
  )

  useEffect(() => {
    const sub = notificationsQuery.unread$.subscribe((values) =>
      setNotifications(values)
    )
    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div
      data-testid={'notifications-global'}
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: notifications.length > 0,
      })}
    >
      {notifications.map((notification) => (
        <NotificationLabel
          key={`notification-${notification.id}`}
          onClick={() => markAsRead(notification.id)}
          additionalStyles={styles.notification}
          text={notification.text}
          left={notification.left}
          icon={NotificationIcons[notification.type]}
        />
      ))}
    </div>
  )
}
