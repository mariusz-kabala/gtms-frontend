import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Notification } from '@gtms/ui/Notification'
import { baseUIQuery, INotificationsActiveState } from 'queries'

import { notificationsQuery } from '@gtms/state-notification'

export const NotificationsActive: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState<INotificationsActiveState>(
    baseUIQuery.notificationsActive()
  )

  useEffect(() => {
    const sub = baseUIQuery.notificationsActive$.subscribe((values) => {
      console.log('on sub!')
      setState(values)
    })

    const sub2 = notificationsQuery.unread$.subscribe((values) => {
      console.log('update is here', values)
    })

    return sub.unsubscribe()
  }, [])
  console.log('RENDER', state)
  if (!state.isVisible) {
    return null
  }

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
