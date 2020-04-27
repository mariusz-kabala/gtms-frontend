import React, { FC, ReactNode, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Overlay } from '@gtms/ui/Overlay'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'

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

  return (
    <div className={cx(styles.modal, additionalStyles)} data-testid="modal">
      <div className={styles.content}>{children}</div>
      <Overlay onClick={onClose} opacity={0.75} />
    </div>
  )
}
