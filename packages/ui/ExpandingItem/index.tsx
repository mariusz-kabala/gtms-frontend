import React, { FC, ReactNode, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Overlay } from '../Overlay'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { IoIosClose, IoMdCreate } from 'react-icons/io'

export const ExpandingItem: FC<{
  additionalStyles?: string
  children: ReactNode
  onClose: () => unknown
  label: ReactNode
  isActive: boolean
  contentLabel?: string
}> = ({
  additionalStyles,
  children,
  isActive,
  label,
  onClose,
  contentLabel,
}) => {
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
      <div className={styles.label}>
        <span data-testid="expanding-item-label">{label}</span>
        <IoMdCreate />
      </div>
      {isActive && (
        <div className={styles.edit}>
          <Overlay onClick={onClose} />
          <div data-testid="expanding-item-content" className={styles.content}>
            <div className={styles.contentLabel}>
              <span>{contentLabel}</span>
              <i onClick={onClose}>
                <IoIosClose />
              </i>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
