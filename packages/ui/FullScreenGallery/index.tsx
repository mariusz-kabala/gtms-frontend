import React, { FC, useEffect, useState, ReactNode } from 'react'
import cx from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
// ui
import { Button } from '@gtms/ui/Button'
import { IoMdCloseCircle } from 'react-icons/io'
import { Scrollbars } from 'react-custom-scrollbars'
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

  const [isWrapperActive, setIsWrapperActive] = useState<boolean>(true)

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="fullScreenGallery"
    >
      {isActive && (
        <>
          <div
            onClick={() => setIsWrapperActive(false)}
            style={{
              backgroundImage: `url('/images/temp_images/group_bg_4.png')`,
            }}
            className={styles.canvas}
          >
            <Button additionalStyles={styles.btn} onClick={() => onClose}>
              Choose this photo
            </Button>
          </div>
          <div
            className={cx(styles.imagesWrapper, {
              [styles.active]: isWrapperActive,
            })}
            onClick={() => setIsWrapperActive(true)}
          >
            <i onClick={onClose} className={styles.iconClose}>
              <IoMdCloseCircle />
            </i>
            <Scrollbars style={{ width: '100%', height: '100vh' }}>
              <ul className={styles.images}>
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-1.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-2.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-3.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-4.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-5.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-6.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-7.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-8.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-9.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-10.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-1.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-2.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-3.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-4.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-5.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-6.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-7.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-8.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-9.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-10.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-11.png')`,
                  }}
                />
                <li
                  className={styles.item}
                  style={{
                    backgroundImage: `url('/images/temp_images/logo-wioska-3.png')`,
                  }}
                />
              </ul>
            </Scrollbars>
          </div>
        </>
      )}
      {!isActive && children}
    </div>
  )
}
