import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Scrollbars } from 'react-custom-scrollbars'
import { ExpandingRow } from '@gtms/ui/ExpandingRow'
import { Notification } from '@gtms/ui/Notification'
import { CloseIcon } from '@gtms/ui/ExpandingRow/CloseIcon'
import { INotificationsSidebarProps, baseUIQuery } from 'queries'
import { NotificationIcons } from 'enums'
import { INotification, deleteNotification } from '@gtms/state-notification'
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
      data-testid={'notifications-sidebar'}
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: state.isOpen,
      })}
    >
      <ExpandingRow>
        <Scrollbars style={{ height: '40vh' }}>
          <div className={styles.header}>
            <h2>Powiadomienia (nowe: {state.unreadCount})</h2>
            <CloseIcon onClick={closeSidebarNotifications} />
          </div>
          <ul>
            {state.notifications.map((notification: INotification) => (
              <Notification
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
      </ExpandingRow>
    </div>
  )
}
