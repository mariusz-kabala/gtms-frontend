import React, { FC, ReactNode, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Overlay } from '../Overlay'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'

export const Modal: FC<{
  additionalStyles?: string
  children: ReactNode
  onClose: () => unknown
}> = ({ children, additionalStyles, onClose }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  return (
    <div className={cx(styles.modal, additionalStyles)} data-testid="modal">
      <div className={styles.content}>{children}</div>
      <Overlay onClick={onClose} />
    </div>
  )
}
