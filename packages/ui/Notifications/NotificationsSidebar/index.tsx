import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Scrollbars } from 'react-custom-scrollbars'
import { IoMdCloseCircle } from 'react-icons/io'
import { NotificationSingle } from '../NotificationSingle'

export const NotificationsSidebar: FC<{
  additionalStyles?: string
  isActive: boolean
  onClose: () => unknown
}> = ({ additionalStyles, isActive, onClose }) => {
  useKey(
    () => {
      onClose()
    },
    {
      detectKeys: [27],
    }
  )

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
            <NotificationSingle
              text="3 new users in your group"
              icon="/images/icons/questionMark.png"
            />
          </ul>
        </Scrollbars>
      </div>
    </div>
  )
}
