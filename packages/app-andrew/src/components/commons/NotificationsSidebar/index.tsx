import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
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
import useKey from 'use-key-hook'
import { IoIosNotifications } from 'react-icons/io'
import { Scrollbars } from 'react-custom-scrollbars'
import { Notification } from '@gtms/ui/Notification'
import { Button } from '@gtms/ui/Button'
import { CloseIcon } from '@gtms/ui/ExpandingRow/CloseIcon'
import { Overlay } from '@gtms/ui/Overlay'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

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

  useEffect(() => {
    if (state.isLogged && !state.isLoaded) {
      loadRecentNotifications()
    }
  }, [state.isLoaded, state.isLogged])

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
      <div className={styles.content}>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <div className={styles.navigation}>
            <h2 className={styles.header}>
              <i>
                <IoIosNotifications />
              </i>
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
                      additionalStyles={styles.notification}
                      icon={
                        NotificationIcons[
                          (notification.data as IInternalNotification).type
                        ]
                      }
                      key={`notification-${notification.id}`}
                      left={(notification.data as IInternalNotification).left}
                      onClick={() => deleteNotification(notification.id)}
                      text={(notification.data as IInternalNotification).text}
                    />
                  )
                case 'api':
                  return (
                    <NotificationAPI
                      {...(notification.data as INotification)}
                      additionalStyles={styles.notification}
                      key={`notification-${notification.id}`}
                    />
                  )
              }
            })}
          </ul>
          <Button
            additionalStyles={styles.btnShowMore}
            data-testid="show-more-tags-button"
          >
            <Spinner size="sm" />
            show more...
          </Button>
        </Scrollbars>
      </div>
      <Overlay
        additionalStyles={styles.overlay}
        onClick={() => closeSidebarNotifications()}
        opacity={0.4}
      />
    </div>
  )
}
