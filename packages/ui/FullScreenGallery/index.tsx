import React, { FC, useEffect, useState } from 'react'
import cx from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
// ui
import { Button } from '@gtms/ui/Button'
import { IoMdGrid, IoIosCheckmarkCircle } from 'react-icons/io'
import { Scrollbars } from 'react-custom-scrollbars'
import styles from './styles.scss'

export const FullScreenGallery: FC<{
  additionalStyles?: string
  isActive: boolean
  onClose: () => unknown
}> = ({ additionalStyles, isActive, onClose }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  const [isImageWrapperActive, setIsImageWrapperActive] = useState<boolean>(
    true
  )

  return (
    <div
      className={cx(styles.wrapper, additionalStyles, {
        [styles.active]: isActive,
      })}
      data-testid="full-screen-gallery"
    >
      <div
        className={styles.canvas}
        onClick={() => setIsImageWrapperActive(false)}
        style={{
          backgroundImage: `url('/images/temp_images/group_bg_4.png')`,
        }}
      />
      <div
        className={cx(styles.imagesWrapper, {
          [styles.active]: isImageWrapperActive,
        })}
      >
        <div className={styles.btns}>
          <Button
            additionalStyles={styles.btn}
            onClick={() => setIsImageWrapperActive(true)}
          >
            <i>
              <IoMdGrid />
            </i>
            Browse gallery
          </Button>
          <Button additionalStyles={styles.btn} onClick={() => onClose()}>
            <i>
              <IoIosCheckmarkCircle />
            </i>
            Choose this photo
          </Button>
        </div>
        <Scrollbars style={{ width: '100%', height: '80%' }}>
          <ul
            className={styles.images}
            onClick={() =>
              isImageWrapperActive
                ? setIsImageWrapperActive(false)
                : setIsImageWrapperActive(true)
            }
          >
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-1.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-2.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-3.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-4.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-5.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-6.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-7.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-8.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-9.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-10.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-1.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-2.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-3.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-4.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-5.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-6.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-7.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-8.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-9.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-10.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-11.png')`,
              }}
            />
            <li
              onClick={() => setIsImageWrapperActive(false)}
              className={styles.item}
              style={{
                backgroundImage: `url('/images/temp_images/logo-wioska-3.png')`,
              }}
            />
          </ul>
        </Scrollbars>
      </div>
    </div>
  )
}
