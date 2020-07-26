import React, { FC, useEffect, ReactNode } from 'react'
import cx from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
// ui
import { Overlay } from '@gtms/ui/Overlay'
import { Picture } from '../Picture'
import styles from './styles.scss'

export const FullScreenGallery: FC<{
  additionalStyles?: string
  children: ReactNode
  isActive: boolean
  onClose: () => unknown
}> = ({ additionalStyles, children, isActive, onClose }) => {
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
      data-testid="fullScreenGallery"
    >
      {isActive && (
        <>
          <ul className={styles.images}>
            <li className={styles.item}>
              <Picture jpg={'/images/temp_images/logo-wioska-2.png'} />
            </li>
            <li className={styles.item}>
              <Picture jpg={'/images/temp_images/logo-wioska-2.png'} />
            </li>
            <li className={styles.item}>
              <Picture jpg={'/images/temp_images/logo-wioska-2.png'} />
            </li>
            <li className={styles.item}>
              <Picture jpg={'/images/temp_images/logo-wioska-2.png'} />
            </li>
            <li className={styles.item}>
              <Picture jpg={'/images/temp_images/logo-wioska-2.png'} />
            </li>
          </ul>
          <Overlay onClick={onClose} />
        </>
      )}
      {!isActive && children}
    </div>
  )
}
