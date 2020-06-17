import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Scrollbars } from 'react-custom-scrollbars'
import { IoMdCloseCircle } from 'react-icons/io'
import { NotificationLabel } from '@gtms/ui/NotificationLabel'
import { INotificationsSidebarProps, baseUIQuery } from 'queries'
import { NotificationIcons } from 'enums'
import {
  INotificationLabel,
  deleteNotification,
} from '@gtms/state-notification'
import { closeSidebarNotifications } from 'state'

export const NotificationsSidebar: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState<INotificationsSidebarProps>(
    baseUIQuery.notificationsSidebar()
  )

  useEffect(() => {
    const sub = baseUIQuery.notificationsSidebar$.subscribe((values) =>
      setState(values)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  useKey(
    () => {
      closeSidebarNotifications()
    },
    {
      detectKeys: [27],
    }
  )

  if (!state.isOpen) {
    return null
  }

  return (
    <div
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: state.isOpen,
      })}
      data-testid={'notifications-sidebar'}
    >
      <div className={styles.content}>
        <Scrollbars style={{ height: '100vh' }}>
          <div className={styles.header}>
            <h2>Powiadomienia (nowe: {state.unreadCount})</h2>
            <i className={styles.iconClose}>
              <IoMdCloseCircle onClick={closeSidebarNotifications} />
            </i>
          </div>
          <ul>
            {state.notifications.map((notification: INotificationLabel) => (
              <NotificationLabel
                key={`notification-${notification.id}`}
                onClick={() => deleteNotification(notification.id)}
                additionalStyles={styles.notification}
                text={notification.text}
                left={notification.left}
                icon={NotificationIcons[notification.type]}
              />
            ))}
          </ul>
        </Scrollbars>
      </div>
    </div>
  )
}
