import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Overlay } from 'components/common/Overlay'

export const Sidebar: FC<{
  additionalStyles?: string
  children: ReactNode
  isActive: boolean
  leftSide?: boolean
  onClose: () => unknown
  rightSide?: boolean
}> = ({
  additionalStyles,
  children,
  isActive,
  leftSide,
  onClose,
  rightSide,
}) => {
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
      data-testid={'sidebar'}
      className={cx(styles.sidebar, additionalStyles, {
        [styles.opened]: isActive,
        [styles.leftSide]: leftSide || !rightSide,
        [styles.rightSide]: rightSide,
      })}
    >
      {isActive && <Overlay onClick={onClose} />}
      <div className={styles.sidebarContent}>{children}</div>
    </div>
  )
}
