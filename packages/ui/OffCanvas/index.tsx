import React, { FC, ReactNode } from 'react'
import cx from 'classnames'
import useKey from 'use-key-hook'
// ui
// @todo check if its needed
// import { Overlay } from '@gtms/ui/Overlay'
// styles
import styles from './styles.scss'

export const OffCanvas: FC<{
  additionalStyles?: string
  children: ReactNode
  isActive?: boolean
  onClose?: () => unknown
  toggleIsActive?: () => void
}> = ({ additionalStyles, children, isActive, onClose }) => {
  useKey(
    () => {
      onClose ? onClose() : null
    },
    {
      detectKeys: [27],
    }
  )

  return (
    <div
      data-testid={'offCanvas'}
      className={cx(styles.offCanvasWrapper, additionalStyles, {
        [styles.isActive]: isActive,
      })}
    >
      {children}
      {/* @todo check if its needed */}
      {/* {isActive && (
        <Overlay isActive={isActive} />
      )} */}
    </div>
  )
}
