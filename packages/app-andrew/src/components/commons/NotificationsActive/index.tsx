import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Notification } from '@gtms/ui/Notification'
import {
  notificationsQuery,
  INotification,
  markAsRead,
} from '@gtms/state-notification'
import { NotificationIcons } from 'enums'

export const NotificationsActive: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [notifications, setNotifications] = useState<INotification[]>(
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
        <Notification
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
