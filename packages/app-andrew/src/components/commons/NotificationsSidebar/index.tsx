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
import {
  INotificationRecord,
  IInternalNotification,
  deleteNotification,
  loadRecentNotifications,
} from '@gtms/state-notification'
import { NotificationAPI } from '../NotificationAPI'
import { closeSidebarNotifications } from 'state'
import { INotification } from '@gtms/commons/models'

export const NotificationsSidebar: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState<INotificationsSidebarProps>(
    baseUIQuery.notificationsSidebar()
  )

  useEffect(() => {
    loadRecentNotifications()
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
          <h2>
            Powiadomienia (nowe: {state.unreadCount})
            <CloseIcon onClick={closeSidebarNotifications} />
          </h2>
          <ul>
            {state.notifications.map((notification: INotificationRecord) => {
              switch (notification.type) {
                case 'internal':
                  return (
                    <Notification
                      key={`notification-${notification.id}`}
                      onClick={() => deleteNotification(notification.id)}
                      additionalStyles={styles.notification}
                      text={(notification.data as IInternalNotification).text}
                      left={(notification.data as IInternalNotification).left}
                      icon={
                        NotificationIcons[
                          (notification.data as IInternalNotification).type
                        ]
                      }
                    />
                  )
                case 'api':
                  return (
                    <NotificationAPI
                      {...(notification.data as INotification)}
                    />
                  )
              }
            })}
          </ul>
        </Scrollbars>
      </ExpandingRow>
    </div>
  )
}
