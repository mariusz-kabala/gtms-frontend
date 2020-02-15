import React, { FC, ReactNode, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Overlay } from 'components/common/Overlay'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { IoIosCloseCircleOutline } from 'react-icons/io'

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
      <div className={styles.content}>
        <i data-testid="close-modal-buton" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </i>
        {children}
      </div>
      <Overlay onClick={onClose} />
    </div>
  )
}
