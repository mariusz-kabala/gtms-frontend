import React, { FC, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
// ui
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { Overlay } from '@gtms/ui/Overlay'
import styles from './styles.scss'

export const Modal: FC<{
  additionalStyles?: string
  children: ReactNode
  onClose: () => unknown
}> = ({ additionalStyles, children, onClose }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  const portal = document.getElementById('__next')

  return portal
    ? createPortal(
        <div
          className={cx(styles.wrapper, additionalStyles)}
          data-testid="modal"
        >
          <div className={styles.content}>{children}</div>
          <Overlay onClick={onClose} />
        </div>,
        portal
      )
    : null
}
