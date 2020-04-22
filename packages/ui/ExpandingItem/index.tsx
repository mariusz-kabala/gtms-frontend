import React, { FC, ReactNode, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Overlay } from '@gtms/ui/Overlay'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { IoIosClose } from 'react-icons/io'

export const ExpandingItem: FC<{
  additionalStyles?: string
  children: ReactNode
  onClose: () => unknown
  label: ReactNode
  isActive: boolean
}> = ({ additionalStyles, children, isActive, label, onClose }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="expanding-item"
    >
      <span data-testid="expanding-item-label" className={styles.label}>
        {label}
      </span>
      {isActive && (
        <>
          <i onClick={onClose}>
            <IoIosClose />
          </i>
          <div data-testid="expanding-item-content" className={styles.content}>
            {children}
          </div>
          <Overlay onClick={onClose} />
        </>
      )}
    </div>
  )
}
