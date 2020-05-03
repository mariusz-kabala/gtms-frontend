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
  closeOnClickOutsie?: boolean
  isActive: boolean
}> = ({
  additionalStyles,
  children,
  isActive,
  label,
  onClose,
  closeOnClickOutsie = true,
}) => {
  useEffect(() => {
    if (isActive) {
      disableBodyScroll(document.body)
    }
  })

  const closeActiveMode = () => {
    onClose()
    enableBodyScroll(document.body)
  }

  useKey(() => closeActiveMode(), {
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
          <i onClick={closeActiveMode}>
            <IoIosClose />
          </i>
          <div data-testid="expanding-item-content" className={styles.content}>
            {children}
          </div>
          <Overlay
            onClick={() => {
              if (closeOnClickOutsie) {
                closeActiveMode()
              }
            }}
          />
        </>
      )}
    </div>
  )
}
