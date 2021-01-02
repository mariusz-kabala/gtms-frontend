import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Notification } from '@gtms/ui/Notification'
import {
  notificationsQuery,
  INotificationRecord,
  IInternalNotification,
  markAsRead,
} from '@gtms/state-notification'
import { NotificationIcons } from '@app/enums'

export const NotificationsActive: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [notifications, setNotifications] = useState<INotificationRecord[]>(
    notificationsQuery.internalUnread()
  )

  useEffect(() => {
    const sub = notificationsQuery.internalUnread$.subscribe((values) =>
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
          text={(notification.data as IInternalNotification).text}
          left={(notification.data as IInternalNotification).left}
          icon={
            NotificationIcons[(notification.data as IInternalNotification).type]
          }
        />
      ))}
    </div>
  )
}
