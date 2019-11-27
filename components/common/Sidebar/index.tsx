import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Overlay } from 'components/Overlay'

export const Sidebar: FC<{
  back: ReactNode
  children: ReactNode
  leftSide: boolean
  rightSide: boolean
  isActive: boolean
  onClose: () => unknown
}> = ({ children, isActive, onClose, leftSide, rightSide }) => {
  const closeSidebar = () => {
    if (onClose) {
      onClose()
    }
  }

  useKey(
    () => {
      closeSidebar()
    },
    {
      detectKeys: [27],
    }
  )

  return (
    <div
      className={cx(styles.sidebar, {
        [styles.opened]: isActive,
        [styles.leftSide]: leftSide || !rightSide,
        [styles.rightSide]: rightSide,
      })}
    >
      {isActive && <Overlay onClick={closeSidebar} />}
      <div className={styles.sidebarContent}>{children}</div>
    </div>
  )
}
