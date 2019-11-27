import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Overlay } from 'components/common/Overlay'

export const Sidebar: FC<{
  additionalStyles?: string
  children: ReactNode
  leftSide?: boolean
  rightSide?: boolean
  isActive: boolean
  onClose: () => unknown
}> = ({
  additionalStyles,
  children,
  isActive,
  onClose,
  leftSide,
  rightSide,
}) => {
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
      data-testid={'sidebar'}
      className={cx(styles.sidebar, additionalStyles, {
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
