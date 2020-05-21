import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Scrollbars } from 'react-custom-scrollbars'
import { IoMdCloseCircle } from 'react-icons/io'
import { Notification } from '@gtms/ui/Notification'
import { INotificationsSidebarProps, baseUIQuery } from 'queries'

export const NotificationsSidebar: FC<{
  additionalStyles?: string
  isActive: boolean
  onClose: () => unknown
}> = ({ additionalStyles, isActive, onClose }) => {
  const [state, setState] = useState<INotificationsSidebarProps>(
    baseUIQuery.notificationsSidebar()
  )

  useEffect(() => {
    const sub = baseUIQuery.notificationsSidebar$.subscribe((values) =>
      setState(values)
    )

    return sub.unsubscribe
  }, [])

  useKey(
    () => {
      onClose()
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
        [styles.opened]: isActive,
      })}
    >
      <div className={styles.content}>
        <Scrollbars style={{ height: '100vh' }}>
          <div className={styles.header}>
            <h2>Powiadomienia (nowe: 34)</h2>
            <i className={styles.iconClose}>
              <IoMdCloseCircle onClick={() => onClose()} />
            </i>
          </div>
          <ul>
            <Notification
              additionalStyles={styles.notification}
              text="3 new users in your group"
              icon={{ jpg: '/images/icons/iconCelebrate.png' }}
            />
          </ul>
        </Scrollbars>
      </div>
    </div>
  )
}
