import React, { FC, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
// ui
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

  const appRoot = document.getElementById('__next')

  return appRoot
    ? ReactDOM.createPortal(
        <div
          className={cx(styles.wrapper, additionalStyles)}
          data-testid="modal"
        >
          <div className={styles.content}>{children}</div>
          <Overlay onClick={onClose} />
        </div>,
        appRoot
      )
    : null
}
