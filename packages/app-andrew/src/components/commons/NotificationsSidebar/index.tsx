import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import useKey from 'use-key-hook'
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
// ui
import { CSSTransition } from 'react-transition-group'
import { Notification } from '@gtms/ui/Notification'
import { CloseIcon } from '@gtms/ui/ExpandingRow/CloseIcon'
import styles from './styles.scss'

export const NotificationsSidebar: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState<INotificationsSidebarProps>(
    baseUIQuery.notificationsSidebar()
  )

  useEffect(() => {
    state.isLogged && loadRecentNotifications()
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

  return (
    <div
      data-testid={'notifications-sidebar'}
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: state.isOpen,
      })}
    >
      <CSSTransition timeout={200} in={state.isOpen}>
        <div className={styles.content}>
          <div className={styles.navigation}>
            <h2 className={styles.header}>
              Notofications {state.unreadCount && `(${state.unreadCount})`}
              {/* @todo add translation here */}
            </h2>
            <ul className={styles.navitems}>
              <li className={styles.navitem}>Latest</li>
              <li className={styles.navitem}>By groups</li>
            </ul>
            <CloseIcon onClick={closeSidebarNotifications} />
          </div>
          <ul className={styles.notifications}>
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
        </div>
      </CSSTransition>
    </div>
  )
}
